<template>
  <div>
    <big-img v-if="showImg" :imgSrc="imgSrc" :imgPosition="imgPosition" :tableHeight="$refs.tables.$el.offsetHeight"></big-img>
    <Card>
      <div class="search-con">
        <Input class="search-input" placeholder="请输入姓名" v-model="searchData.name" />
        <Select class="search-col" clearable v-model="searchData.gender" placeholder="请选择性别">
          <Option v-for="item in $appConst.enum.user_gender" :value="item.key" :key="item.key">{{ item.label }}</Option>
        </Select>
        <Select class="search-col" clearable v-model="searchData.city" placeholder="请选择城市">
          <Option v-for="item in cities" :value="item.label" :key="item.key">{{ item.label }}</Option>
        </Select>
        <Button class="search-btn" @click="searchExamples" icon="ios-search" type="primary" ghost>搜索</Button>
      </div>
      <div class="tables-bar">
        <Button type="primary" class="tables-btn" @click="handleCreate()">添加</Button>
      </div>
      <Table ref="tables" stripe :columns="columns" :data="tableData" sortable="custom" @on-sort-change="handleSortChange">
        <template slot-scope="{ row }" slot="gender">{{ row.gender | getConstLabel($appConst.enum.user_gender) }}</template>
        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" @click="handleShow(row,index)">查看</Button>
          <Button size="small" class="tables-row-btn" @click="handleEdit(row,index)">编辑</Button>
          <Button size="small" class="tables-row-btn" @click="handleEditJobs(row,index)">工作</Button>
          <Button size="small" class="tables-row-btn" @click="handleDelete(row,index)">删除</Button>
        </template>
      </Table>
      <div class="pages">
        <Page v-show="total>0" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange" :total="total" show-sizer show-total show-elevator />
      </div>
    </Card>
    <Modal class-name="vertical-center-modal">
      <example-edit ref="modal" :modal="modal"></example-edit>
    </Modal>
  </div>
</template>
<script>
import ExampleEdit from './edit'
import BigImg from './bigImg'
import { fetchPages, fetchCities, deleteApp } from '@/api/example'
export default {
  name: 'tables_page',
  data() {
    return {
      imgSrc: '',
      imgPosition: {},
      showImg: false,
      searchData: {
        name: '',
        sort: { key: 'createTime', order: true }
      },
      total: 0,
      columns: [
        {
          title: '姓名', key: 'image',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.image
                },
                on: {
                  click: (event) => {
                    this.showImg = false
                    this.imgSrc = ''
                    this.imgPosition = {}
                    this.hindleDisplayDigImg(event, params.row)
                    event.stopPropagation()
                  }
                },
                style: {
                  width: '40px',
                  height: '40px'
                }
              }),
            ]);
          }
        },
        { title: '性别', key: 'gender', slot: 'gender', sortable: true },
        { title: '地址', key: 'address', sortable: true },
        { title: '创建时间', key: 'createTime', sortable: true },
        { title: '操作', key: 'action', slot: 'action', width: 220 }
      ],
      tableData: [],
      cities: [],
      modal: {
        isvisible: false,
        actionType: this.$appConst.ACTION_TYPE.CREATE,
        title: '新增'
      }
    }
  },
  components: {
    ExampleEdit,
    BigImg
  },
  methods: {

    //获取大图位置
    hindleDisplayDigImg(event, item) {
      let _this = this
      setTimeout(() => {
        _this.showImg = true
        _this.imgSrc = item.image
        _this.imgPosition = event
      }, 10)
    },
    handleCreate() {
      this.initialModal('新增', this.$appConst.ACTION_TYPE.CREATE)
    },
    handleShow(row, index) {
      this.initialModal('详情', this.$appConst.ACTION_TYPE.VIEW, row.id)
    },
    handleEdit(row, index) {
      this.initialModal('编辑', this.$appConst.ACTION_TYPE.EDIT, row.id)
    },
    handleEditJobs(row, index) {
      this.$router.push({ path: 'dynamic_edit', query: { id: row.id, name: row.name } })
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
    handleDelete(row, index) {
      this.$Modal.confirm({
        title: '确认删除？',
        onOk: () => {
          deleteApp(row.id).then(res => {
            this.tableData = res.data.list// mock

            this.total = res.data.total// mock
            // this.searchExamples() 实际项目这样做
          })
        }
      })
    },
    handlePageChange(page) {
      //显示多少条
      debugger
      this.searchData.page = page
      this.searchExamples()
    },
    //跳过多少条
    handlePageSizeChange(pageSize) {
      debugger
      this.searchData.pageSize = pageSize
      this.searchExamples()
    },
    handleSortChange(colum, key, order) {
      this.searchData.sort = { key: key, order: order === 'desc' }
      this.searchExamples()
    },
    searchExamples() {
      fetchPages(this.searchData).then(res => {

        this.tableData = res.data.list
        this.total = res.data.total
        this.tableData = this.tableData.map(v => { return { ...v, image: require('../../assets/images/秋田犬.jpg') } })
      })
    },
    searchCities() {
      fetchCities().then(res => {
        this.cities = res.data
      })
    },
    initiaExample() {
      this.searchCities()
      this.searchExamples()
    }
  },
  mounted() {
    let _this = this
    this.initiaExample()
    //点击其他部分，关闭大img
    document.onclick = function (e) {
      e = e || window.event;
      if (e.target.id === "bigImg") return
      _this.showImg = false
      _this.imgSrc = ''
      _this.imgPosition = {}
    };
  }
}
</script>
<style>
</style>
