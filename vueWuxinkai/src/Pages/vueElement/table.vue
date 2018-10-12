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
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
    }
  },
  methods: {
    //页面请求数据
    ...mapActions("tableVisible", ["getData"]), //（五）
  },
  mounted() {
    // console.log(this.getTableList); //获取同步数据
    this.getData() //异步请求第一步
  },
  computed: {
    ...mapGetters("tableVisible", ["getTableList"]),
    ...mapActions("tableVisible", ["getAsynData"]),
  }
}
</script>