<template>
  <div id="app">
    <!-- 
      loadNum:加载多少条
      loadNum:行高
      tableHeight:表格高
    -->
    <extra-long-table :tableHeight="700" :tdHeight="44" :loadNum="50" ref="currentRowTable" :columns="columns" :tableList="dataTable"></extra-long-table>
  </div>
</template>
<script>

import { ExtraLongTable } from '../../components/container2';
export default {
  name: 'app',
  components: {
    ExtraLongTable
  },
  data() {
    return {
      columns: [
        //表头
        {
          title: "选择",
          type: "checkbox",
          width: 80,
          align: "center"
        },
        {
          title: "序号",
         
          width: 80,
          align: "center",
          key: "index",
        },
        {
          title: "大标签",
          key: "columns1",
          width: 150,
          align: "center",
          sortable: true
        },
        {
          title: "小标签",
          key: "columns2",
          width: 150,
          align: "center"
        },
        {
          title: "站点",
          key: "columns3",
          width: 150,
          align: "center"
        },
        {
          title: "已校验",
          key: "logic",
          width: 150,
          type:'signal',
          align: "center"
        }
      ],
      dataTable: [] //表格数据
    }
  },
  methods: {
    showOther() {
      let List = [];
      for (let i = 0; i < 10000; i++) {
        let data = {};
        for (let m = 0; m < this.columns.length; m++) {
          data[`columns${m}`] = i + 1; //`${i+1}行${m+1}列`;
          data.index =666;
          data.checkbox = false;
          
        }
        List.push(data);
      }
      this.dataTable = List;
    }
  },
  mounted() {
    this.showOther()
    // for (let i = 0; i < 10000; i++) {
    //   let data = {};
    //   for (let m = 0; m < this.columns.length; m++) {
    //     data[`columns${m}`] = i + 1; //`${i+1}行${m+1}列`;
    //     data.index = i + 1;
    //   }

    //   this.dataTable.push(data);
    // }
  }
}
</script>

<style>
</style>
