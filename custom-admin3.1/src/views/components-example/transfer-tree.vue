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
            <Tree :data="data1" :load-data="loadTreeData" show-checkbox @on-check-change="checkChangeTree"></Tree>
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
              <div class="transfer-list-menu" v-show="item.indeterminate">
                <Checkbox v-model="item.checked"><span class="source-right-title">{{item.title}}</span>
                </Checkbox>
                <div>=</div>
                <Select v-model="model1" class="transfer-list-select">
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div class="transfer-list-line">
                  <Icon type="ios-close" style="font-size:28px" />
                  <div class="line"></div>
                  <Icon type="ios-checkmark" />
                </div>
              </div>
              <div class="relationship-outer" v-show="!item.indeterminate">
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

export default {

  data() {
    return {
      source_value: {
        source_right_value: "",
        source_left_value: "",
      },
      loading_show: false,
      source_right_data: [],
      cityList: [],
      source_data: [
        {
          title: 'parent',
          loading: false,
          children: []
        }
      ],
      data1: [
        {
          title: '第一层 1',
          expand: true,
          children: [
            {
              title: '第二层 1-1',
              expand: true,
              children: [
                {
                  title: '第三层 1-1-1'
                },
                {
                  title: '第三层 1-1-2'
                }
              ]
            },
            {
              title: '第二层 1-2',
              expand: true,
              children: [
                {
                  title: '第三层 1-2-1'
                },
                {
                  title: '第三层 1-2-1'
                }
              ]
            }
          ]
        },
        {
          title: '第一层 2',
          expand: true,
          children: [
            {
              title: '第二层 1-1',
              expand: true,
              children: [
                {
                  title: '第三层 1-1-1'
                },
                {
                  title: '第三层 1-1-2'
                }
              ]
            },
            {
              title: '第二层 1-2',
              expand: true,
              children: [
                {
                  title: '第三层 1-2-1'
                },
                {
                  title: '第三层 1-2-1'
                }
              ]
            }
          ]
        }
      ]
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
    checkChangeTree() {

    },
    //转移到右侧
    leftShuttle() {

    },
    //转移到左侧
    rightShuttle() {

    },
    //右边搜索
    filterRightCon() {

    },
    //左边搜索
    filterAddTree() {

    },
    //创建关系
    createRelationship() {

    }
  },
  mounted() {

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
        &:hover {
          background: rgba(245, 248, 254, 1);
        }
        /deep/ .ivu-checkbox-wrapper {
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
