<template>
  <div>
    <div>
      <el-button type="info" @click="customColumn">定制可见列</el-button>
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
    <visible-col ref='prop' @setCustomCols="finishCustom" :Content='customArrColumns' :showModel="visibleColShow"></visible-col>
  </div>
</template>

  <script>
import { mapGetters, mapActions } from "vuex";
import visibleCol from '&/common/visibleCol'
export default {
  data() {
    return {
      visibleColShow: { show: false }, //定制可见列的显示和隐藏
      customArrColumns: [ //定制可见列的数组
        { property: 'CREATE_USERnow', label: '发布人' },
         { property: 'USER_TYPEnow', label: '发布人类型' }, 
         { property: 'CREATE_TIMEnow', label: '发布时间' }
         ],
    }
  },
  methods: {
    //页面请求数据
    ...mapActions("tableVisible", ["getData"]), //（五）

    //弹出定制可见列
    customColumn() {
      let root = this
      // if (root.customArrColumns.length > 0) {
      //   for (let index = 0; index < root.customArrColumns.length; index++) {
      //     const element = root.customArrColumns[index];
      //     element.isChecked = root.customObjColumns[element['property']]
      //     this.$set(root.customArrColumns, index, element)
      //   }
      // } else { //自动生成自定义可见列的项，目前未生效
      //   this.$refs.tables.columns.forEach(item => {
      //     if (item.type.toUpperCase() == 'FILTER') {
      //       item.isChecked = root.customObjColumns[item['property']]
      //       root.customArrColumns.push(item)
      //     }
      //   })
      // }
      this.visibleColShow.show = true
    },
    //定制可见列关闭生效
    finishCustom(arr) {
      // let root = this
      // for (let index = 0; index < arr.length; index++) {
      //   const item = arr[index];
      //   root.customObjColumns[arr[index]['property']] = item.isChecked
      // }
      this.visibleColShow.show = false
    },
  },
  mounted() {
    // console.log(this.getTableList); //获取同步数据
    this.getData() //异步请求第一步
  },
  computed: {
    ...mapGetters("tableVisible", ["getTableList"]),
    ...mapActions("tableVisible", ["getAsynData"]),
  },
  components: {
    visibleCol
  },
}
</script>