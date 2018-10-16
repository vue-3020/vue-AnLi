<template>
  <div>
    <el-table :data="getTableList" border show-summary style="width: 100%">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1">
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2">
      </el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3">
      </el-table-column>
    </el-table>
    <el-button @click="exportExcel">导出excel</el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";  //获取vuex的方法
import { Excel } from '@/utils/excel'
import { uExportExcel } from '@/api/server.conf'
export default {
  data() {
    return {
      currentPage: 1, //当前是第几页
      pageSize: 3,//总共多少页
      // getCount 显示有多少条数据
    }
  },

  computed: {
    ...mapGetters("vuexTestIndex", ["getTableList", "getCount"]), //获取表格数据 和总条数
  },
  methods: {
    ...mapActions("vuexTestIndex", ["getTableData"]), //请求数据的方法
    exportExcel() {
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
  },
  mounted() {
    //事件发起请求
    this.getTableData({
      carentPage: this.currentPage,
      pageSize: this.pageSize
    });
    this.$nextTick().then(function () {
    })
  }
}
</script>