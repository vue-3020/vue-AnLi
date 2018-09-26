<template>

  <div>
    <el-table
      :data="getTableList"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseOut"
      border
      show-summary
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="amount1"
      sortable
      label="数值 1">
    </el-table-column>
    <el-table-column
      prop="amount2"
      sortable
      label="数值 2">
    </el-table-column>
      <el-table-column
        prop="amount3"
        sortable
        label="数值 3">
      </el-table-column>
  </el-table>
  <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      total: 100
    };
  },
  computed: {
    ...mapGetters("vuexTest", ["getTableList"]),
    // ...mapGetters("user", ["userID", "username"])
  },
  created() {},
  methods: {
    ...mapActions("vuexTest", ["getTableData"]),
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    // 跳转到多少页
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData({ carentPage: this.currentPage, pageSize: val });
    },
    // 点击页码按钮
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData({ carentPage: val, pageSize: this.pageSize });
    },
    // 表格编辑
    handleEdit: function (row) {
      //遍历数组改变editeFlag
    },
    handleSave: function (row) {
      //保存数据，向后台取数据
    },
    // 鼠标进入
    handleMouseEnter: function (row, column, cell, event) {
      cell.children[0].style.color = "red";
    },
    // 鼠标离开
    handleMouseOut: function (row, column, cell, event) {
      cell.children[0].style.color = "black";
    }
  },
  mounted() {
    // debugger
    this.getTableData({
      carentPage: this.currentPage,
      pageSize: this.pageSize
    });
    this.$nextTick().then(function () {
    })
  }
};
</script>
<style scoped>
.cell-edit-input .el-input, .el-input__inner {
  width:100px;
}

.cell-icon{
  cursor:pointer;
  color:#fff;
}
</style>


