<template>
  <div>
    <Row>
      <Col span="24">
      <Card>
        <Table :columns="table.columns" :data="table.data">
          <template slot="lb_detail_small" slot-scope="{ row,index }">
            <div>
              <Input :ref="'input'+index" :value="row.lb_detail_small" class="detail_inpupt" @keyup.enter.native="searchArticle(index)" @input="inpuvalue(row,$event,index)" :autofocus="true" :key="index" />
            </div>
          </template>
          <template slot="label_type" slot-scope="{ row,index }">
            <div class="label_outer">
              <Icon v-if="row.label_type==1" class="label_icon" type="md-checkmark" />
            </div>
          </template>
        </Table>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'bigMinGrid',
  props: [],
  data() {
    return {
      oldItem: [],//修改前的值
      modify: false,
      inputValue: {},
      table: {
        item_big: {},
        columns: [
          {            title: "选择",
            width: 100,
            align: 'center',
            key: '_checked',
          },
          { title: "序号", align: "center", key: "ordinal", width: 80 },
          { title: "标签号", align: "center", slot: "lb_detail_small" },
          { title: "是否为大标签", align: "center", slot: "label_type", width: 170 }
        ],
        data: [
          {
            ordinal: 1, //序号
            evy_number: "", //有多少盘
            label_type: 2, //是不是大标签
            lb_detail_big: "", //大标签号
            lb_detail_small: "", //小标签号
          }
        ]
      }
    }
  },
  mounted() {
    let _this = this
    // this.table.data = [
    //   {
    //     ordinal: 1, //序号
    //     evy_number: "10", //有多少盘
    //     label_type: 1, //是不是大标签
    //     lb_detail_big: "9202010101050240511120042321MHL05161400006", //大标签号
    //     lb_detail_small: "9202010101050240511120042321MHL05161400006", //小标签号
    //   }
    // ]
    _this.$refs.input0.focus()
  },
  methods: {
    //获取值的过程
    inpuvalue(row, item, index) {
      let _this = this
      //设置6个1就是大标签
      if (item == 111111) {
        row.label_type = 1
      } else {
        row.label_type = 2
      }
      row.detail = item
      //修改的时候找到从前的第一次 ，没有值说明是新增
      if (row.lb_detail_small.trim() != "") {
        if (row.label_type != "") {
          let add_flag = _this.oldItem.some(i => i.ordinal == (index + 1)) //通过行号过去值
          if (add_flag) {
            for (var i = 0; i < _this.oldItem.length; i++) {
              if (_this.oldItem[i].ordinal === (index + 1)) {
                _this.oldItem[i] = row
              }
            }
          } else {
            _this.oldItem.push(row)
          }
        }
      }
      //只有输入最后一个是新增，点击其他的都是修改
      if (item.trim() !== "" && (index + 1) != _this.table.data.length) {
        this.modify = true
      }
      this.inputValue = { row, index, data: item, modify: this.modify, oldItem: this.oldItem }
    },
    //回车事件
    searchArticle(index) {
      let _this = this
      var arr = Object.keys(this.inputValue);
      if (arr.length !== 0) {
        this.checkdownref(this.inputValue)
      } else {
        this.$Message.error('请添加数据');
      }
      _this.$nextTick(() => {
        _this.$refs[`input${index + 1}`].focus();
        _this.SortTableNumber()
      })
    },
    //设置盘数
    SortTableNumber(data) {
      for(var i=0;i< this.table.data.length;i++){
        this.table.data[i].ordinal = i+1
      }
    },
    //获取回车的内容
    async checkdownref(item) {
      let _this = this
      const tableItem = await _this.addTableDetail(item.row)

    },

    //添加到表格里数据
    async addTableDetail(item) {
      let _this = this
      const resData = await new Promise(resolve => {
        if (typeof (item) == "object") {
          if (item.label_type == 1) {
            _this.table.item_big = JSON.parse(JSON.stringify(item)) //大标签被删除 需要重新恢复成原来的大标签
          } else {
            item.lb_detail_big = _this.table.item_big.detail ? _this.table.item_big.detail : '' //大标签号
          }
          item.lb_detail_small = item.detail
          item.label_type = item.label_type  // 判断是大标签还是小标签
          _this.table.data.splice((_this.table.data.length - 1), 0, item)  //插入一行
          resolve(_this.table.data)
        } else {
          //没有赋值
          resolve(_this.table.data)
        }
      });
      return resData
    },
  }
}
</script>
 
<style lang="less" scoped>
.detail_inpupt {
  width: 100%;
  border: none;
  display: block;
  /deep/.ivu-input {
    border: none;
    height: 38px;
    font-size: 14px;
    color: #8092b0;
    margin-top: 1px;
    line-height: 38px;
    text-align: center;
  }
}
/deep/.ivu-table-row-highlight {
  .detail_inpupt {
    .ivu-input {
      border: none;
      height: 38px;
      margin-top: 1px;
      line-height: 38px;
      background: #ebf7ff;
      box-shadow: none !important;
    }
  }
}
.label_icon {
  color: #3670e0;
  font-size: 26px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>