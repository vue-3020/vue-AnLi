<template>
  <div>
    <Card>
      <div class="search-con">

        <Input class="search-input" placeholder="请输入姓名" v-model="searchData.name" />
        <Select class="search-col" clearable v-model="searchData.gender" placeholder="请选择性别">
          <Option v-for="item in $appConst.enum.user_gender" :value="item.label" :key="item.key">{{ item.label }}</Option>
        </Select>
        <Select class="search-col" clearable v-model="searchData.city" placeholder="请选择城市">
          <Option v-for="item in cities" :value="item.label" :key="item.key">{{ item.label }}</Option>
        </Select>
        <Button class="search-btn" @click="handleSearch" icon="ios-search" type="primary" ghost>搜索</Button>
      </div>
      <div class="tables-bar">
        <Button type="primary" class="tables-btn" @click="handleCreate()">添加</Button>
        <Button type="primary" class="tables-btn" @click="handleMutiltRemove()">删除</Button>
        <Button type="primary" icon="md-download" class="tables-btn" @click="exportExcel">导出文件</Button>
      </div>
      <app-table ref="tables" stripe :columns="columns" :searchData="searchData" :fetch-data-api="fetchDataApi" @on-delete="handleDelete" @on-show="handleShow" @on-edit="handleEdit" @on-selection-change="handleSelectChange"></app-table>
    </Card>
    <Modal class-name="vertical-center-modal">
      <example-edit ref="modal" :modal="modal"></example-edit>
    </Modal>
    <br>
    <h2>下载</h2>
    <pre>
       "xlsx": "^0.13.3"
    </pre>
    <h2>引入</h2>
    <pre>
      import excel from '@/libs/excel'
    </pre>
    <h2>配置文件</h2>
    <pre>
    D:\1项目资料\vue-AnLi\custom-admin3.1\src\libs\excel.js
    </pre>
  </div>
</template>
<script>
import ExampleEdit from './edit'
import AppTable from '@/components/tables'
import excel from '@/libs/excel'
import { fetchPages, fetchCities, deleteApp } from '@/api/example'
export default {
  name: 'tables_page',
  data() {
    return {
      btnSetting: this.$appConst.rowBtnSetting,
      searchData: {
        name: '',
        sort: { key: 'CreateTime', order: true }
      },
      fetchDataApi: fetchPages,
      columns: [
        {          title: '全选',
          type: 'selection',
          width: 60,
          align: 'center'
        },
        { title: '姓名', key: 'name', sortable: true },
        { title: '性别', key: 'gender', enum: 'user_gender', sortable: true },
        { title: '地址', key: 'address', sortable: true },
        { title: '创建时间', key: 'createTime', sortable: true },
        {
          title: '操作',
          key: 'handle',
          options: ['delete', 'show', 'edit'],
          button: [
            (h, params, vm) => {
              return h('Button', {
                props: {
                  type: 'default',
                  size: 'small'
                },
                style: {
                  marginRight: '2px'
                },
                on: {
                  click: () => {
                    this.handleShow(params.row)
                  }
                }
              }, '自定义')
            }
          ]
        }
      ],
      cities: [],
      selectRows: [],
      modal: {
        isvisible: false,
        actionType: this.$appConst.ACTION_TYPE.CREATE,
        title: '新增'
      }
    }
  },
  components: {
    ExampleEdit,
    AppTable
  },
  methods: {
    //下载
    exportExcel() {
      if (this.selectRows.length) {
        this.exportLoading = true
        const params = {
          title: ['一级分类', '二级分类', '三级分类', '四级分类'], //表头名字
          key: ['name', 'gender', 'address', 'createTime'],
          data: this.selectRows, //数据
          autoWidth: true,
          filename: '分类列表' //表名字
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('请勾选数据')
      }
    },
    handleSearch() {
      this.$refs.tables.search()
    },
    handleCreate() {
      this.initialModal('新增', this.$appConst.ACTION_TYPE.CREATE)
    },
    handleShow(row) {
      this.initialModal('详情', this.$appConst.ACTION_TYPE.VIEW, row.id)
    },
    handleEdit(row) {
      this.initialModal('编辑', this.$appConst.ACTION_TYPE.EDIT, row.id)
    },
    initialModal(title, actionType, id) {
      this.modal.isvisible = true
      this.modal.title = title
      this.modal.actionType = actionType
      if (id) { this.modal.id = id }
      // 清空之前的值
      this.$refs.modal.exampleForm = {
        id: '',
        name: '',
        gender: null,
        address: '',
        createTime: null
      }
      this.$refs.modal.initExample()
    },
    handleDelete(row) {
      this.deleteApps(row.id)
    },
    handleMutiltRemove() {
      console.log(this.selectRows)

      let ids = this.selectRows.map(el => {
        return el.id
      }).join(',')
      console.log(ids)
      this.deleteApps(ids)
    },
    handleSelectChange(selection) {
      this.selectRows = Array.from(selection)
    },
    searchCities() {
      fetchCities().then(res => {
        this.cities = res.data
      })
    },
    deleteApps(ids) {
      deleteApp(ids).then(res => {
        this.tableData = res.data.list// mock
        this.total = res.data.total// mock
        // this.searchExamples() 实际项目这样做
      })
    },
    initiaExample() {
      this.searchCities()
    }
  },
  mounted() {
    this.initiaExample()
  }
}
</script>
<style>
</style>
