<template>
  <Layout style="height: 100%" class="main">
    <!-- 左侧菜单 -->
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">

      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <!-- 头部导航 -->
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <!-- 头像 -->
          <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
          <!-- 语言 -->
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
         <!-- bug日志 -->
          <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store>
         <!-- 全屏 -->
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <!-- 横向菜单 -->
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <!-- handleClick 切换事件，  tagNavList 数据  handleCloseTag 关闭事件-->
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'

import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo, // 引入图片
      isFullscreen: false
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    // 横向标签导航列表
    tagNavList () {
      return this.$store.state.app.tagNavList // 获取app文件里的state 属性下tagNavList值
    },
    // 横向 标签路由
    // tagRouter () {
    //   return this.$store.state.app.tagRouter
    // },
    // 当前头像
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    // 是否缓存
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    // 菜单列表
    menuList () {
      return this.$store.getters.menuList
    },
    // 语言
    local () {
      return this.$store.state.app.local
    },
    // 查看错误日志
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    // 查看信息
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    // dom 生成完成
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    // 跳转页面
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      // 页面跳转的时候判断是否有isTurnByHref_，如果有就走这一行
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    // 接收广播过来的参数
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    // 关闭 tab切换
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    // 页面跳转
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    // 监听$route , 页面跳转，才会触发事件
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      // 面包屑
      this.setBreadCrumb(newRoute)
      // tab导航获取列表
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      // 设置子元素的选中样式
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    // 获取列表
    this.setTagNavList()
    // 主页路径
    this.setHomeRoute(routers)
    // 声明 路由属性
    const { name, params, query, meta } = this.$route
    // 增加标签
    this.addTag({ route: { name, params, query, meta } })
    // 设置面包屑
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    this.getUnreadMessageCount()
  }
}
</script>
