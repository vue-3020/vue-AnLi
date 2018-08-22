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
      type="index"
      width="180">
    </el-table-column>
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
  <el-button @click="exportExcel">导出excel</el-button>
  <el-button @click="open">打开弹框</el-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Excel } from '@/utils/excel'
import { uExportExcel } from '@/api/server.conf'
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      total: 100
    };
  },
  computed: {
    ...mapGetters("vuexTest", ["getTableList"])
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
    },
    exportExcel() {
      // let _this = this
      //  angular中请求示例
      // $scope.captions=["A端", "Z端"];
      // $scope.columns=["A","Z"];
      // url:"http://10.4.0.77:1335/WorkDetailInfo/Work_detail_info/excel";
      // workIDs="'FWKT20180802171844632'";
      // Work_Type=1;
      // // "'FWKT20180802090939167'|1"
      // excelService.export({
      //     captions: $scope.captions,
      //     columns: $scope.columns,
      //     url: tescomm.config.system.ApiService + "WorkDetailInfo/Work_detail_info/excel",
      //     condition: workIDs+"|"+Work_Type,
      //     fileName: Work_Type==0?"资源核实":Work_Type==1?"服务开通":Work_Type==15?"服务变更":"服务关闭"
      // });
      console.log(uExportExcel)
      let workIDs = '"FWKT20180802171844632"'
      let WorkType = 1
      let options = {
        captions: ['A端', 'Z端'],
        columns: ['A', 'Z'],
        url: uExportExcel.url,
        method: uExportExcel.method,
        condition: workIDs + '|' + WorkType,
        fileName: "当前告警"
      }
      Excel(options)
    },
    open() {
      // this.$alert('这是一段内容', '标题名称', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.$message({
      //       type: 'info',
      //       message: `action`
      //     });
      //   }
      // });
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  mounted() {
    // debugger
    this.getTableData({
      carentPage: this.currentPage,
      pageSize: this.pageSize
    });
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


