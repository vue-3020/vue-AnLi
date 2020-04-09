<template>
  <Row :gutter="16">
    <Col span="6">
    <Menu :accordion="true" width="80" :active-name="activeName">
      <div class="menu-collapsed">
        <template v-for="item in level_menu_list">
          <div v-if="item.meun_bean_list && item.meun_bean_list.length > 0" class=" ivu-tooltip">
            <menu-item :name="item.menu_name" :key="item.menu_name">
              <div style="display: flex;">
                <div style="width: 32px;margin: 0 auto;">
                  <img class="imgCurrent" style="vertical-align: middle" :src="getPath(item.rsim_url)">
                </div>
                <ul class="ivu-dropdown-menu sub-menu">
                  <li class="ivu-dropdown-item" v-for="subItem in  item.meun_bean_list" :key="`drop-menu-${subItem.rs_code}`">
                    <div class="" style="position: relative;">
                      <span>{{subItem.name}}</span>
                      <i v-if="subItem.tabs && subItem.tabs.length > 0" class="ivu-icon ivu-icon-ios-arrow-down ivu-menu-submenu-title-icon"></i>
                    </div>

                    <ul class="ivu-dropdown-menu ">
                      <li class="ivu-dropdown-item" v-for="i in  subItem.tabs" @click.stop="handleSelect(i)" :key="`drop-menu-${i.rs_code}`">
                        <span> {{i.text}}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </menu-item>
          </div>
          <Tooltip v-else transfer :content="item.menu_name" placement="right" class="TooltipBox" :key="`drop-menu-${item.frame}`">
            <menu-item :name="item.menu_name" :key="`menu-${item.menu_name}`">
              <div style="display: flex;">
                <div style="width: 32px;">
                  <img class="imgCurrent" style="vertical-align: middle" :src="getPath(item.rsim_url)" alt="">
                </div>
              </div>
            </menu-item>
          </Tooltip> 

          <!-- <div v-if="item.tabs && item.tabs.length > 0" class="TooltipBox ivu-tooltip">
            <menu-item :name="item.frame" :key="`menu-${item.frame}`" class="sub-menu-box">
              <div style="display: flex;">
                <div style="width: 32px;margin: 0 auto;">
                  <img class="imgCurrent" style="vertical-align: middle" :src="getImg(item.rsim_url)" alt="">
                  <img class="imgActive" style="vertical-align: middle" :src="getActiveImg(item.rsim_url)" alt="">
                </div>
                <ul class="ivu-dropdown-menu sub-menu">
                  <li class="ivu-dropdown-item" v-for="i in  item.tabs" @click="handleSelect(i.frame)" :key="`drop-menu-${i.frame}`">
                    {{i.text}}
                  </li>
                </ul>
              </div>
            </menu-item>
          </div>
          <Tooltip v-else transfer :content="item.name" placement="right" class="TooltipBox" :key="`drop-menu-${item.frame}`">
            <menu-item :name="item.frame" :key="`menu-${item.frame}`">
              <div style="display: flex;">
                <div style="width: 32px;">
                  <img class="imgCurrent" style="vertical-align: middle" :src="getImg(item.rsim_url)" alt="">
                  <img class="imgActive" style="vertical-align: middle" :src="getActiveImg(item.rsim_url)" alt="">
                </div>
              </div>
            </menu-item>
          </Tooltip> -->
        </template>
      </div>
    </Menu>
    </Col>
    <Col span="6">
    <!-- 

      :active-name="activeName"   激活菜单的 name 值
     class="Menu-style" 
     theme="light" 
     accordion                    是否开启手风琴模式，开启后每次至多展开一个子菜单
     :open-names="openNames"      展开的 Submenu 的 name 集合
     @on-select="checkList"       选择菜单（MenuItem）时触发
      @on-open-change="openList"  当 展开/收起 子菜单时触发
     -->
    <Menu ref="side_menu" :active-name="activeName" class="Menu-style" theme="light" accordion :open-names="openNames" @on-select="checkList" @on-open-change="openList">
      <Submenu v-for="item in level_menu_list" :name="item.menu_name" :key="item.menu_name" ref="child">
        <template slot="title">
          <div class="menu-one">
            <img class="icon-img" :src="getPath(item.rsim_url)">
            <span>{{item.menu_name}}</span>
          </div>
        </template>
        <template v-for="list1 in item.meun_bean_list">
          <!-- 有子菜单 tabs  -->
          <Submenu v-if="list1.tabs&&list1.tabs.length!==0" :name="list1.name">
            <template slot="title">
              <span>{{list1.name}}</span>
            </template>
            <MenuItem :name="list2.text" v-for="list2 in list1.tabs" :to="list2.frame" :key="list2.rs_code">
            {{list2.text}}
            </MenuItem>
          </Submenu>
          <!-- 没有子菜单 -->
          <MenuItem v-else :name="list1.name" to="跳转路由">
          {{ list1.name }}
          </MenuItem>
        </template>
      </Submenu>
    </Menu>
    </Col>
    <Col span="6">
    <!-- <Menu ref="side_menu" :active-name="activeName2" class="Menu-style" theme="light" accordion :open-names="openNames2" @on-select="checkList2" @on-open-change="openList2">
      <Submenu v-for="item in nowData" :name="item.name" :key="item.name" ref="child">
        <template slot="title">
          <i :class="'iconfont '+item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <template v-for="list1 in item.children">
          <Submenu v-if="list1.children&&list1.children.length!==0" :name="list1.name">
            <template slot="title">
              <i :class="'iconfont '+'11'"></i>
              <span>{{list1.title}}</span>
            </template>
            <MenuItem :name="list2.name" v-for="list2 in list1.children" to="跳转路由" :key="list2.name">
            {{list2.title}}
            </MenuItem>
          </Submenu>
          <MenuItem class="noChildmenuitem" v-else :name="list1.name" to="跳转路由">
          <i :class="'iconfont '+'11'"></i>
          &nbsp;&nbsp;&nbsp;
          {{ list1.title }}
          </MenuItem>
        </template>
      </Submenu>
    </Menu> -->
    </Col>
    <Col span="6">
    <div>col-6</div>
    </Col>
  </Row>
</template>
<script>
import { level_menu_list } from '@/assets/json/menu_data'

export default {
  name: '',
  data() {
    return {
      level_menu_list: [],
      activeName: "",
      openNames: [], //张开的是那个月
      activeName2: "4-1-1",
      openNames2: ["4", "4-1"],
      nowData: [{
        title: ' 4',
        name: '4',
        icon: 'iconxiangmugaikuo1',
        closable: false,
        showInTags: true,
        showInMenus: true,
        choosed: true,
        opened: false,
        children: [
          {
            title: '4-1',
            name: '4-1',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false,
            opened: false,
            children: [
              {
                title: '4-1-1',
                name: '4-1-1',
                closable: true,
                showInTags: false,
                showInMenus: true,
                opened: false
              },
              {
                title: '4-1-2',
                name: '4-1-2',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-1-3',
                name: '4-1-3',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false,
                opened: false,
              },
            ]
          },
          {
            title: '4-2',
            name: '4-2',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false,
            children: [
              {
                title: '4-2-1',
                name: '4-2-1',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-2-2',
                name: '4-2-2',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-2-3',
                name: '4-2-3',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-2-4',
                name: '4-2-4',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-2-5',
                name: '4-2-5',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              }
            ]
          },
          {
            title: '4-3',
            name: '4-3',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false,
            children: [
              {
                title: '4-3-1',
                name: '4-3-1',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-3-2',
                name: '4-3-2',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },

            ]
          },
          {
            title: '4-4',
            name: '4-4',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false,
            children: [
              {
                title: '4-4-1',
                name: '4-4-1',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              }
            ]
          },
          {
            title: '4-5',
            name: '4-5',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false
          },
          {
            title: '4-6',
            name: '4-6',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false
          },
        ]
      }]
    }
  },
  mounted() {
    let _this = this
    setTimeout(() => {
      _this.level_menu_list = level_menu_list
      // _this.activeName = '关系管理';
      // _this.openNames = ["基础物联管理", "业务建模"];
    }, 1000)

    //  console.log(`111111111111111111`,this.getOpenedNamesByActiveName())
    // debugger
  },
  methods: {
    handleSelect(path) {
      this.$router.push({name: path.frame})

    },
    getPath(path) {
      return require(`../../assets/images/menu/${path}`)
    },


    checkList(data) {
      this.activeName = data
    },
    openList(data) {
      this.openNames = data
    },
    checkList2() {

    },
    openList2() {

    },

  },
  watch: {
    openNames() {
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      })
    }
  }
}
</script>
<style lang="less" scoped>
.menu-one {
  display: flex;
  justify-content: start;
  align-items: center;
  .icon-img {
    margin-right: 10px;
  }
}
.ivu-tooltip {
  display: block;
}
</style>