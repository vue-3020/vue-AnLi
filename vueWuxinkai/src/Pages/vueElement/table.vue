<template>
  <div>
    <div>
      <el-button type="info" @click="customColumn">定制可见列</el-button>
      <el-table :data="getTableList" style="width: 100%">
        <el-table-column prop="date" label="日期" >
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="WORK_TITLE" label="办事标题">
          <template slot-scope="scope">
            <span class="link-type">{{scope.row.WORK_TITLE}}</span>
          </template>
        </el-table-column>
        <!-- 定制可见列 -->
        <el-table-column prop="CREATE_USERnow" v-if="customObjColumns.CREATE_USERnow" label="发布人">
        </el-table-column>
        <el-table-column prop="USER_TYPEnow" v-if="customObjColumns.USER_TYPEnow" label="发布人类型">
        </el-table-column>
        <el-table-column prop="CREATE_TIMEnow" v-if="customObjColumns.CREATE_TIMEnow" label="发布时间">
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
      customObjColumns: {  //定制可见列的显示隐藏对象
        CREATE_USERnow: false,
        USER_TYPEnow: true, 
        CREATE_TIMEnow: false 
      },
    }
  },
  methods: {
    //页面请求数据
    ...mapActions("tableVisible", ["getData"]), //（五）

    //弹出定制可见列
    customColumn() {
      let _this = this
      if (_this.customArrColumns.length > 0) {
        //判断哪些默认被勾选，如果有勾选的把值传给模态框
        for(var i=0; i<_this.customArrColumns.length; i++){
          const element = _this.customArrColumns[i];
          element.isChecked = _this.customObjColumns[element['property']];
          this.$set(_this.customArrColumns,i,element) //给data对象新增属性，并触发视图更新
        }
      } else { //自动生成自定义可见列的项，目前未生效
        // this.$refs.tables.columns.forEach(item => {
        //   if (item.type.toUpperCase() == 'FILTER') {
        //     item.isChecked = root.customObjColumns[item['property']]
        //     root.customArrColumns.push(item)
        //   }
        // })
      }
      this.visibleColShow.show = true
    },
    //定制可见列关闭生效
    finishCustom(arr) {
      let _this = this;
      for (var i = 0; i < arr.length; i++) {
        const item = arr[i]; //获取数组中的每一个对象
        _this.customObjColumns[arr[i]['property']] = item.isChecked
      }
      this.visibleColShow.show = false; //关闭
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