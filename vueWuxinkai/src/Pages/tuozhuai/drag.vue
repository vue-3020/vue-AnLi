<template>
  <div id="topo-container">
    <item-list id="item-list-left"></item-list>
    <div class="item-rights">
      <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit" class="grid-tabs" @tab-click="handleTabsClick">
        <el-tab-pane :key="item.name" v-for="(item, index) in editableTabs" :label="item.title" :name="item.name">
          <div id="chart-container">
            <div class="toolbar">
              <el-button size="medium">返回</el-button>
              <el-button type="primary" size="medium" @click="save()">保存</el-button>
            </div>
            <svg id="topo-chart" width="5000" height="5000"></svg>
            <svg id="topo-chart" :id="item.content" :key="item.name" width="5000" height="5000"></svg>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as util from "&/topo/util";
import Chart from "&/topo/chart";
import itemList from "&/topo/item-list.vue";

let chart = null;

let itemdatas = [{
  container: {},
  data: null,
  id: "S6",
  inputIds: [],
  inputPathIds: [],
  itemIcon: "",
  name: "Subjects + Studies + Studies",
  outputIds: ["S4", "S5"],
  outputPathIds: [],
  type: "FUNCTION",
  x: 1084,
  y: 539
},
{
  container: {},
  data: null,
  id: "S5",
  inputIds: ["S5"],
  inputPathIds: [],
  itemIcon: "",
  name: "Studies",
  outputIds: [],
  outputPathIds: [],
  type: "FUNCTION",
  x: 884,
  y: 639
},
{
  container: {},
  data: null,
  id: "S4",
  inputIds: ["S4"],
  inputPathIds: [],
  itemIcon: "",
  name: "Subjects + Studies",
  outputIds: ["S3"],
  outputPathIds: [],
  type: "FUNCTION",
  x: 884,
  y: 489
},
{
  container: {},
  data: null,
  id: "S3",
  inputIds: ["S3"],
  inputPathIds: [],
  itemIcon: "",
  name: "Subjects + Studies",
  outputIds: ["S1", "S2"],
  outputPathIds: [],
  type: "FUNCTION",
  x: 684,
  y: 489
},
{
  container: {},
  data: null,
  id: "S2",
  inputIds: ["S2"],
  inputPathIds: [],
  itemIcon: "",
  name: "Studies",
  outputIds: [],
  outputPathIds: [],
  type: "FUNCTION",
  x: 484,
  y: 539
},
{
  container: {},
  data: null,
  id: "S1",
  inputIds: ["S1"],
  inputPathIds: [],
  itemIcon: "",
  name: "Subjects",
  outputIds: [],
  outputPathIds: [],
  type: "FUNCTION",
  x: 484,
  y: 439
}]
export default {
  components: {
    itemList
  },
  name: "topo",
  data() {
    return {
      editItem: null,
      dialog: {
        DEVICE: false,
        CUSTOM_DATA: false,
        LOGIC_RULE: false,
        ARITHMETIC: false,
        APP: false,
        HTTP: false,
        EMAIL: false
      },
      editableTabsValue: '1', //tabs 标签默认选中第二个
      editableTabs: [{ //tabs 数据
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  },
  mounted() {
    let container = d3.select("#topo-chart");
    //创建一个实例
    chart = new Chart({
      container: container,
      onItemDblclick: this.onItemDblclick //双击
    });

    this.loadData();
    this.bindDragEvent();
  },
  methods: {
    onConfirm() {
      alert();
    },
    bindDragEvent() {
      let dragDeltaX, dragDeltaY, dragItem, $dragItem;
      let items = d3.selectAll(".item-list .item");
      let count = 1;
      let drag = d3
        .drag()
        .on("start", function () {
          //获取团拽目标的 坐标
          let mousePosition = d3.mouse(this);

          dragDeltaX = mousePosition[0];
          dragDeltaY = mousePosition[1];
          //克隆
          dragItem = this.cloneNode(true);
          //将克隆的内容插入到尾部
          document.getElementById("app").append(dragItem);
          $dragItem = d3.select(dragItem);
          //设置在画布中的x轴坐标和y轴坐标
          getItemPosition($dragItem, d3.event.sourceEvent.x - dragDeltaX, d3.event.sourceEvent.y - dragDeltaY);
        })
        //拖拽中的位置
        .on("drag", function () {
          getItemPosition($dragItem, d3.event.sourceEvent.x - dragDeltaX, d3.event.sourceEvent.y - dragDeltaY - 70
          );
        })
        //放下后的位置
        .on("end", function () {
          var arrItem = [];
          //减去 chart-container 的位置
          let $container = document.getElementById("chart-container");
          //设置偏移量
          let position = {
            x: d3.event.sourceEvent.x - dragDeltaX - $container.offsetLeft - 150,
            y: d3.event.sourceEvent.y - dragDeltaY - $container.offsetTop - 70
          };
          if (position.x > 0) {
            //设置两个按钮的重合
            var ftop = position.x;
            var fleft = position.y;
            var ObgjecItem = chart.getItemsNoid();
            ObgjecItem.forEach(function (item) {
              var btop = item.x;
              var bleft = item.y;
              // console.log(btop);
              if (
                ftop + 50 < btop ||
                ftop > btop + 50 ||
                fleft + 50 < bleft ||
                fleft > bleft + 50
              ) {
                console.log("和所有兄弟都不相交");
              } else {
                //新增一个图标
                var item2 = chart.addItem({
                  x: position.x + 200,
                  y: position.y + 30,
                  id: "22222",
                  name: $dragItem.attr("data-name"),
                  type: $dragItem.attr("data-type")
                });
                arrItem.push(item2);
                console.log("和某个兄弟相交:", item.id);
              }
            });

            //调用的是chart.js的 addItem方法
            var item1 = chart.addItem({
              x: position.x,
              y: position.y,
              id: count,
              name: $dragItem.attr("data-name"),
              type: $dragItem.attr("data-type")
            });
            count++;
            arrItem.push(item1);
            // let line = Chart._addLine(arrItem[0], "output", arrItem[1], "input");
            // line.updatePath();

          }
          $dragItem.remove();
        });
      items.call(drag); //用call 设置样式

      //给拖拽过来的 元素 设置在画布的位置
      let getItemPosition = function ($item, x, y) {
        $item.attr(
          "style",
          `position:fixed;transform:translate(${x}px, ${y}px)`
        );
      };
    },
    save() {
      // 项目中替换为持久存储
      localStorage.setItem("items", JSON.stringify(chart.getItems()));
    },
    loadData() {
      // chart.setItems(JSON.parse(localStorage.getItem("items")));
      chart.setItems(itemdatas);
    },
    //切换画布  type:1-新增画布，2-加载已有画布
    handleTabsClick(canvasId, type) {
      debugger
    },
    // tab 增加新内容
    handleTabsEdit(targetName, action) {
      debugger
      if (action === 'add') {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    //双击事件
    onItemDblclick(item) {
      this.editItem = item;
      this.dialog[item.name] = true;
    },
    //双击关闭事件
    onCloseDialog(item) {
      // console.log(item);
      this.dialog[item.name] = false;
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.toolbar {
  position: absolute;
  right: 10px;
  top: 10px;
}

#item-list-left {
  width: 160px;
  padding-left: 20px;
  border-right: 1px solid #ccc;
  box-shadow: 5px 5px 15px #666;
  float: left;
  background: #3d545c;
  float: left;
}

#chart-container {
  position: absolute;
  top: 0;
  left: 160px;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.item-rights {
  float: left;
  left: 190px;
  width: 86%;
  position: absolute;
  .grid-tabs {
    background: #fff;
    height: 600px;
    width: 100%;
  }
}
#topo-chart {
  cursor: crosshair;

  /deep/ .item {
    cursor: move;

    &.active .item-rect {
      stroke: red;
      stroke-width: 5px; //点击事件
      stroke-dasharray: 5px;
    }
  }

  /deep/ .item_label {
    font-size: 13px;
    fill: pink; //文字颜色
    stroke-width: 0;
    user-select: none;
  }

  /deep/ .port {
    fill: rgb(42, 10, 185);
    stroke: rgb(14, 212, 7); //边线颜色
    stroke-width: 2;
    cursor: crosshair;
  }

  /deep/ .port-hovered {
    fill: red;
    stroke: #ff7f0e;
  }

  /deep/ .line {
    //设置颜色
    fill: none;
    stroke: rgb(6, 19, 199);
    stroke-width: 4px; //粗细

    &.active {
      stroke: #ff7f0e;
      stroke-width: 4;
    }
  }
}

.topo-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #eee;
  }

  .el-dialog__footer {
    border-top: 1px solid #eee;
  }

  .el-select {
    display: block;
  }

  .el-input-number {
    width: 100%;

    .el-input__inner {
      text-align: left;
    }
  }

  .el-dialog__body {
    max-height: 450px;
    overflow: auto;
  }
}
</style>

