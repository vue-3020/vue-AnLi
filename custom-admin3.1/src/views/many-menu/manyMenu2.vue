<template>
  <div class="deskTop_page">
    <Menu ref="side_menu" :active-name="activeName" class="Menu-style" theme="light" :class="menuitemClasses" accordion :open-names="openNames" @on-select="checkList" @on-open-change="openList">
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
    </Menu>
  </div>
</template>
<script>
export default {
  name: '',
  methods: {
    checkList() {

    },
    openList() {

    }
  },
  data() {
    return {
      activeName: "4-1",
      openNames: ["4-1"],
      menuitemClasses: "4-1",
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
          {
            title: '4-7',
            name: '4-7',
            closable: true,
            showInTags: false,
            showInMenus: true,
            choosed: false,
            children: [
              {
                title: '4-7-1',
                name: '4-7-1',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              },
              {
                title: '4-7-2',
                name: '4-7-2',
                closable: true,
                showInTags: false,
                showInMenus: true,
                choosed: false
              }
            ]
          }
        ]
      }]



    }
  }
}
</script>
<style scoped>
.Menu-style {
  width: 500px;
  margin: 100px auto;
}
</style>