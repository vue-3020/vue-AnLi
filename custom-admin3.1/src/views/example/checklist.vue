<template>
  <div>
    <Card>
      <Form ref="searchForm" :model="searchData" inline>
        <FormItem>
          <Input placeholder="请输入名称" v-model="searchData.name" />
        </FormItem>
        <FormItem>
          <Select clearable v-model="searchData.gender" placeholder="请选择性别">
            <Option v-for="item in $appConst.enum.user_gender" :value="item.label" :key="item.key">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Select clearable v-model="searchData.city" placeholder="请选择城市">
            <Option v-for="item in cities" :value="item.label" :key="item.key">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button class="search-btn" @click="searchExamples" type="primary">
            <Icon type="search" />搜索
          </Button>
        </FormItem>
        <FormItem style="float:right">
          <router-link to="/example/create">
            <Button type="info">
              <Icon />添加
            </Button>
          </router-link>
        </FormItem>
      </Form>
      <Table ref="tables" stripe :columns="columns" :data="tableData">
        <template slot-scope="{ row }" slot="gender">{{ row.gender | getConstLabel($appConst.enum.user_gender) }}</template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(row,index)">查看</Button>
          <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row,index)">编辑</Button>
          <Button type="error" size="small" @click="remove(row,index)">删除</Button>
        </template>
      </Table>
      <Page v-show="total>0" @on-change="pageChange" @on-page-size-change="pageSizeChange" :total="total" show-sizer show-total show-elevator />
    </Card>
  </div>
</template>
<script>
import { fetchPages, fetchCities } from '@/api/example'
export default {
  name: 'tables_page',
  data() {
    return {
      searchData: {
        orders: [{ propertyName: 'CreateTime', isDesc: true }]
      },
      total: 0,
      columns: [
        // { title: 'id', key: 'id' },
        { title: '姓名', key: 'name', sortable: true },
        { title: '性别', key: 'gender', slot: 'gender', sortable: true },
        { title: '地址', key: 'address', sortable: true },
        { title: '创建时间', key: 'createTime', sortable: true },
        { title: '操作', key: 'action', slot: 'action', width: 180 }
      ],
      tableData: [],
      cities: []
    }
  },
  methods: {
    show(row, index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    edit(row, index) {

    },
    remove(row, index) {
      this.data6.splice(index, 1)
    },
    pageChange(page) {
      this.searchData.page = page
      this.searchExamples()
    },
    pageSizeChange(pageSize) {
      this.searchData.pageSize = pageSize
      this.searchExamplessss()
    },
    searchExamples() {
      fetchPages(this.searchData).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
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
    this.initiaExample()
  }
}
</script>
<style>
</style>
