<template>
  <div>
    <!-- <vxe-grid border show-overflow class="vxe-table-iview" height="460" ref="xTable" :loading="loading"  :columns="tableColumn" :edit-config="{trigger: 'click', mode: 'row'}"></vxe-grid> -->
    <vxe-grid border show-overflow class="vxe-table-iview" height="460" ref="xTable"  header-align="center" :loading="loading"  :columns="tableColumn" ></vxe-grid>
  </div>
</template>
<script>

export default {
  name: 'customFn',
  props: [],
  data() {
    let restaurants = ['前端', '后端', '开发', '测试']
    let sexList = [
      { label: '女', value: '0' },
      { label: '男', value: '1' }
    ]
    let sexGroupList = [
      {
        label: '分组1',
        options: [
          {
            label: '男',
            value: '1'
          }
        ]
      },
      {
        label: '分组2',
        options: [
          {
            label: '女',
            value: '0'
          }
        ]
      }
    ]
    let regionList = [
      {
        label: '值 1',
        value: '1',
        children: [
          { label: '值 1-1', value: '11' },
          { label: '值 1-2', value: '12' }
        ]
      }
    ]
    return {
      loading: false,
        tableColumn: [
        { type: 'checkbox', width: 60,align:'center' },
        { type: 'seq', title: '序号', width: 80,align:'center'  },
        { field: 'name', title: 'Number', minWidth: 140, editRender: { name: 'Input' },align:'center'  },
        { field: 'role', title: 'AutoComplete', width: 160, editRender: { name: 'AutoComplete', props: { data: restaurants, filterMethod: this.roleFilterMethod } } },
        { field: 'age', title: 'InputNumber', width: 160, editRender: { name: 'InputNumber', props: { max: 35, min: 18 } } },
        { field: 'sex', title: 'Select', width: 140, editRender: { name: 'Select', options: sexList } },
        { field: 'sex1', title: 'Select', width: 160, editRender: { name: 'Select', options: sexList, props: { multiple: true, clearable: true } } },
        { field: 'sex2', title: 'Select', width: 140, editRender: { name: 'Select', optionGroups: sexGroupList, props: { clearable: true } } },
        { field: 'region', title: 'Cascader', width: 200, editRender: { name: 'Cascader', props: { data: regionList } } },
        { field: 'date', title: 'DatePicker', width: 200, editRender: { name: 'DatePicker', props: { type: 'date', format: 'yyyy/MM/dd' } } },
        { field: 'date1', title: 'TimePicker', width: 200, editRender: { name: 'TimePicker', props: { type: 'time' } } },
        { field: 'flag', title: 'iSwitch', width: 100, editRender: { name: 'iSwitch', type: 'visible' } },
        { field: 'rate', title: 'Rate', width: 200, editRender: { name: 'Rate', type: 'visible' } }
      ]


    }
  },
  created() {
    var list = [];
    for (var index = 0; index < 10000; index++) {
      list.push({
        id: index + 10000,
        name: "test" + index,
        role: "前端",
        sex: "0",
        sex1: '0',
        sex2: '1',
        age: 10,
        date: "2019-05-01",
        date1: '00:09:30',
        region: ['1', '12'],
        flag: true,
        rate: 3
      });
    }
    this.loading = true
    setTimeout(() => {``
      this.loadList(list);
      this.loading = false
    }, 500)
  },
  methods: {
    roleFilterMethod(value, option) {
      return option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1
    },
    //获取数据
    loadList(data) {
      const xTable = this.$refs.xTable
      const startTime = Date.now()
      if (xTable) {
        this.$refs.xTable.reloadData(data).then(() => {
          this.$XModal.message({ message: `渲染 ${data.length} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
          this.loading = false
        })
      }
    }
  }
}
</script>
 
<style lang="less" scoped>
@import url("https://cdn.jsdelivr.net/npm/iview/dist/styles/iview.css");
@import url("https://cdn.jsdelivr.net/npm/vxe-table/lib/style.css");
@import url("https://cdn.jsdelivr.net/npm/vxe-table-plugin-iview/dist/style.css");
</style>