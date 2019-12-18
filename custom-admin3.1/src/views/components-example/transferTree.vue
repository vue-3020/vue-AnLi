<template>
  <div class="transfer-con">
    <Row>
      <Col span="9">
      <Card>
        <div class="transfer-left">
          <h3 class="transfer-title">数据源</h3>
          <div class="search-input">
            <Input v-model="source_value.source_left_value" search placeholder="输入你要搜索的内容" @on-search="filterAddTree('left')" />
          </div>
          <div class="tree-list">
            <Tree :data="source_data" :load-data="loadTreeData" show-checkbox @on-check-change="checkChangeTree"></Tree>
          </div>
        </div>
      </Card>
      </Col>
      <Col span="3">
      <div class="transfer-center">
        <div class="transfer-btn">
          <img @click="leftShuttle" src="../../assets/images/leftArrow.png" alt="" />
          <img @click="rightShuttle" src="../../assets/images/rightArrow.png" alt="" />
        </div>
      </div>
      </Col>
      <Col span="12">
      <Card>
        <div class="transfer-right">
          <h3 class="transfer-title">已选字段</h3>
          <div class="search-input">
            <Input v-model="source_value.source_right_value" search placeholder="输入你要搜索的内容" @on-search="filterRightCon('right')" />
          </div>
          <ul class="transfer-list">
            <Spin fix v-if="loading_show">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>加载中...</div>
            </Spin>
            <li class="transfer-list-li" v-for="(item,index) in source_right_data" :key="index">
              <div class="transfer-list-menu" v-show="item.relation">
                <Checkbox v-model="item.checked"><span class="source-right-title">{{item.title}}</span>
                </Checkbox>
                <div>=</div>
                <!-- 选中内容 -->
                <Select v-if="!item.check_mark" v-model="item.select_value" class="transfer-list-select">
                  <Option v-for="(t,index) in item.select_list" :value="t.title" :key="index">{{ t.title }}</Option>
                </Select>
                <div style="width: 219px;height: 27px;" v-else>
                  {{item.select_value}}
                </div>
                <div class="transfer-list-line" v-if="!item.check_mark">
                  <Icon type="ios-close" style="font-size:28px" @click="goBackRelation(item)" />
                  <div class="line"></div>
                  <Icon type="ios-checkmark" @click="confirmRelation(item)" />
                </div>
                <div class="transfer-list-line" v-else>
                  <Icon class="trash_outline" type="ios-trash-outline" @click="deleteRelation(item)" />
                </div>
              </div>
              <div class="relationship-outer" v-show="!item.relation">
                <Checkbox v-model="item.checked"><span class="source-right-title">{{item.title}}</span>
                </Checkbox>
                <div class="relationship" @click="createRelationship(item)">
                  创建关系
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import { tree_data } from '@/assets/json/json_data'
export default {
  data() {
    return {
      model1: '',
      source_value: {
        source_right_value: "",
        source_left_value: "",
      },
      loading_show: false,
      source_right_data: [],
      cityList: [], //下拉菜单
      cur_field: {}, //当前字段
      source_data: [],
      //勾线选中状态
      source_check_data: [],
      //临时存储做搜索用
      source_right_each: []
    }
  },
  methods: {
    //获取tree列表
    loadTreeData(item, callback) {
      setTimeout(() => {
        const data = [
          {
            title: 'children',
            loading: false,
            children: []
          },
          {
            title: 'children',
            loading: false,
            children: []
          }
        ];
        callback(data);
      }, 1000);
    },
    //点击左侧勾选事件
    checkChangeTree(item, next) {
      this.source_check_data = item
    },
    //转移到右侧
    leftShuttle() {

    },
    //左侧删除勾选的内容
    filterSelecCon(data, parentData = {}) {
      for (var i = data.length - 1; i >= 0; i--) {
        let item = data[i];
        if (item.children && item.children.length <= 0) { //等于空的时候 跳出循环
          continue;
        }
        if (item.children && item.children.length > 0) {
          var children = item.children;
          this.filterSelecCon(children, item); //有子元素就循环。
        } else {
          //将穿梭到右侧的内容在左侧删除
          let singleData = parentData.children.findIndex(item => item.checked && item.checked == true);
          if (singleData != -1) {
            parentData.children.splice(singleData, 1);
            this.$forceUpdate();
          }
        }
      }
    },
    //转移到左侧
    rightShuttle() {
      let _this = this
      if (_this.source_check_data.length > 0) {
        _this.filterSelecCon(this.source_data) // 删除左侧的内容
        _this.source_check_data.forEach(item => {
          if (!item.hasOwnProperty('children')) {
            item.checked = false //选中后，到有右边要把勾选的删除
            _this.source_right_data.push(item) //添加到右边
            _this.source_right_each.push(item) //搜索的为空的时候，从新赋值
          }
        })
        _this.exclusive()
        _this.source_check_data = []
      } else {
        _this.$Message.error('数据源不能为空')
      }
    },
    exclusive() {
      let _this = this
      for (var i = 0; i < _this.source_right_data.length; i++) {
        for (var j = 0; j < _this.source_right_data.length; j++) {
          if (_this.source_right_data[i].title != _this.source_right_data[j].title) {
            let object = {}
            _this.source_right_data[i].select_list.push(_this.source_right_data[j])
            _this.source_right_data[i].select_list = _this.source_right_data[i].select_list.reduce((cur, next) => {
              object[next.title] ? "" : object[next.title] = true && cur.push(next)
              return cur
            }, [])
          }
        }
      }
      this.$forceUpdate()
    },
    //右边搜索
    filterRightCon() {

    },
    //左边搜索
    filterAddTree() {
      this.recursionTree(this.source_data, this.source_value.source_left_value)
    },
    //搜索数据
    recursionTree(data, nemeTrim) {
      nemeTrim = nemeTrim.trim()
      if (data.length > 0 && nemeTrim != "") {
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          //判断有没有子元素，有子元素就接着往下找， 没有子元素就看当前有没有符合 的
          if (item.children && item.children.length > 0) {
            //如果有子元素判断，是否相等
            if (item.title === nemeTrim) {
              this.source_data = [];
              this.source_data.push(item);
              return;
            } else {
              this.recursionTree(item.children, nemeTrim);
              return
            }
          } else {
            if (item.title === nemeTrim) {
              this.source_data = []; //让总数据等于空，从新插入数据
              this.source_data.push(item);
              return
            }
          }
        }
      } else {
        //从新渲染数据
        this.source_data = tree_data
      }
    },
    //创建关系
    createRelationship(item) {
      item.relation = true
      this.$forceUpdate()
    },
    //返回创建关系
    goBackRelation(item) {
      item.select_value = ""
      item.relation = false
      this.$forceUpdate()
    },
    //确认
    confirmRelation(item) {

      if (item.select_value == "") {
        this.$Message.error('数据源不能为空')
      } else {
        item.check_mark = true
      }
    },
    treeSelectOpen(item, flag) {
      console.log(item)
      let list = this.source_right_data.filter(v => {
        //用的名字去匹配的
        return v.title !== item.title
      })
      this.cityList = list
    },
    //删除功能
    deleteRelation() {}
  },
  mounted() {
    this.source_data = tree_data
  }

}
</script>
<style lang="less" scoped>
.transfer-height {
  height: 572px;
}
.transfer-con {
  /deep/.ivu-card-body {
    padding: 16px 26px;
    /deep/ .ivu-checkbox-checked .ivu-checkbox-inner:after {
      top: 2px;
      left: 5px;
    }

    /deep/.ivu-checkbox-indeterminate .ivu-checkbox-inner {
      border-color: #255dcb;
      background-color: #255dcb;
    }
    /deep/.ivu-checkbox-checked .ivu-checkbox-inner {
      border-color: #255dcb;
      background-color: #255dcb;
    }
  }
  padding: 0 30px;
  border: 1px solid transparent;
  .newly-steps {
    margin-top: 40px;
    margin-bottom: 50px;
  }
  .search-input {
    /deep/.ivu-input {
      height: 50px;
      background: rgba(247, 250, 255, 1);
      border-radius: 9px;
      border: 1px solid rgba(215, 223, 237, 1);
    }
    /deep/ .ivu-icon-ios-search {
      top: 10px;
      right: 10px;
      font-size: 26px;
    }
  }
  .transfer-title {
    font-size: 16px;
    font-weight: 500;
    color: rgba(61, 80, 114, 1);
    height: 30px;
    line-height: 30px;
  }
  .transfer-right {
    .transfer-height();
    .transfer-list {
      height: 480px;
      overflow: auto;
      margin-top: 10px;
      padding: 10px 0 0;
      .transfer-list-li {
        display: flex;
        margin-bottom: 10px;
        padding: 10px 0;
        border-radius: 4px;
        .trash_outline {
          display: none;
        }
        &:hover {
          background: rgba(245, 248, 254, 1);
        }
        &:hover .trash_outline {
          display: inline-block;
        }
        /deep/ .ivu-checkbox-wrapper {
          display: flex;
          margin-top: 4px;
        }
        .transfer-list-line {
          display: flex;
          font-size: 30px;
          position: relative;
          top: -2px;
          .line {
            width: 1px;
            height: 20px;
            margin-top: 4px;
            background: #979797;
          }
        }
        .transfer-list-select {
          width: 219px;
          height: 27px;
          background: #e6eef9;
          border-radius: 10px;
          margin-top: -4px;
          /deep/.ivu-select-selection {
            border-radius: 10px;
            border: none;
            background: #e6eef9;
          }
        }
        .transfer-list-menu {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .relationship-outer {
          width: 100%;
          display: flex;
          /deep/.ivu-checkbox-wrapper {
            line-height: normal !important;
          }
        }
        .relationship-img {
          width: 15px;
          height: 15px;
          margin-left: 6px;
          margin-top: 4px;
        }
        .relationship {
          width: 66px;
          height: 21px;
          margin-left: 10px;
          text-align: center;
          border-radius: 3px;
          border: 1px solid rgba(37, 93, 203, 1);
          font-size: 12px;
          font-weight: 400;
          color: rgba(37, 93, 203, 1);
          line-height: 21px;
        }
        /deep/.ivu-checkbox {
          margin-right: 10px;
          margin-top: 3px;
        }
        /deep/.ivu-checkbox-wrapper {
          font-size: 14px;
          font-weight: 400;
          color: rgba(128, 146, 176, 1);
          line-height: 12px;
        }
      }
    }
  }
  .transfer-center {
    .transfer-height();
    display: flex;
    justify-content: center;
    align-items: center;
    .transfer-btn {
      width: 100px;
      height: 200px;
      img {
        cursor: pointer;
        margin: 30px auto;
        display: block;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .tree-list {
    height: 480px;
    overflow: auto;
    margin-top: 10px;
  }
  .transfer-left {
    .transfer-height();
    /deep/.ivu-tree-title {
      font-size: 16px;
    }
    /deep/ .ivu-checkbox {
      margin-top: 5px;
    }

    /deep/.ivu-icon-ios-arrow-forward:before {
      content: " ";
      display: block;
      width: 9px;
      height: 13px;
      opacity: 1;
      background: url("../../assets/images/triangle2.png") no-repeat;
      background-size: 100%;
    }
  }
}
.source-right-title {
  display: inline-block;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
