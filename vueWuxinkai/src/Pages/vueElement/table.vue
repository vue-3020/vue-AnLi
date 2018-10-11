<template>
  <div>
    <div>
      <el-table :data="getTableList" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="WORK_TITLE" label="办事标题">
          <template slot-scope="scope">
            <span class="link-type">{{scope.row.WORK_TITLE}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="operation">
      <!-- <el-pagination :page-size="pageSize" :current-page="currentPage" prev-text="上一页" next-text="下一页" layout="total, prev, pager, next" @current-change="handleCurrentChange" :total="getAffairsCount">
      </el-pagination> -->
      <!-- <el-button class="el-button--blue" @click="addOrEditAffairs">新建
        <i class="el-icon-plus el-icon--right"></i>
      </el-button>
      <el-button class="btn-left-5 el-button--danger" @click="batchDelete">删除
        <i class="el-icon-minus el-icon--right"></i>
      </el-button>
      <el-button class="btn-left-5 el-button--primary" @click="exportExcel">导出
        <i class="icon-export el-icon--right"></i>
      </el-button> -->
    </div>
  </div>
</template>

  <script>
import { mapGetters, mapActions} from "vuex";

// import { uExportExcel } from '@/api/vueElement/tableApi'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      getTableList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: { //计算属性
    // ...mapActions("affairs", ["getTableListClick"]),
  },
  mounted() {
    // this.getTableListClick({pageIndex: 1, pageSize: 20, WORK_STATE: 1})
  },
  computed: {
    ...mapGetters("affairs", ["getTableList"]),
  }
}
</script>