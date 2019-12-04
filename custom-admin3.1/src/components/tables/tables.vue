<template>
  <div>
    <div>
      <Table
        ref="tablesMain"
        :data="insideTableData"
        :columns="insideColumns"
        :stripe="stripe"
        :border="border"
        :show-header="showHeader"
        :width="width"
        :height="height"
        :loading="loading"
        :disabled-hover="disabledHover"
        :highlight-row="highlightRow"
        :row-class-name="rowClassName"
        :size="size"
        :no-data-text="noDataText"
        :no-filtered-data-text="noFilteredDataText"
        @on-current-change="onCurrentChange"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-selection-change="onSelectionChange"
        @on-filter-change="onFilterChange"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @on-expand="onExpand"
        sortable="custom"
        @on-sort-change="sortChange"
      >
        <slot name="header" slot="header"></slot>
        <slot name="footer" slot="footer"></slot>
        <slot name="loading" slot="loading"></slot>
      </Table>
      <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
    </div>

    <div class="pages">
      <Page
        v-show="total>0"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
        :total="total"
        show-sizer
        show-total
        show-elevator
      />
    </div>
  </div>
</template>

<script>
import { getEnumLabel } from '@/utils'
import handleBtns from './handle-btns'
export default {
  name: 'Tables',
  data () {
    return {
      insideColumns: [],
      insideTableData: [],
      total: 0
    }
  },
  props: {
    searchData: {
      type: Object
    },
    options: {
      type: Object
    },
    fetchDataApi: Function,
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabledHover: {
      type: Boolean
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    size: String,
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    context: {
      type: Object
    }
  },
  methods: {
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },

    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    sortChange (column, key, order) {
      this.searchData.sort = { key: key, order: order === 'desc' }
      this.search()
    },
    pageChange (page) {
      this.searchData.page = page
      this.search()
    },
    pageSizeChange (pageSize) {
      this.searchData.pageSize = pageSize
      this.search()
    },
    suportEnum (item) {
      item.render = (h, params) => {
        params.tableData = this.insideTableData
        let label = getEnumLabel(this.$appConst.enum[item.enum], params.row[item.key])
        return h('span', label)
      }
      return item
    },
    suportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.insideTableData
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      console.log(columns)
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.enum) {
          res = this.suportEnum(res)
        } else {
          if (res.key === 'handle') res = this.suportHandle(res)
        }
        return res
      })
    },
    search () {
      let _this = this
      this.fetchDataApi(this.searchData).then(res => {
        _this.insideTableData = res.data.list
        _this.total = res.data.total
        _this.handleColumns(_this.columns)
      })
      // this.options.doSearch(this.searchData).then(res => {
      //   _this.insideTableData = res.data.list
      //   _this.total = res.data.total
      //   _this.handleColumns(_this.columns)
      // })
    },
    init () {
      this.searchData.page = this.searchData.page || 1
      this.searchData.pageSize = this.searchData.pageSize || 10
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
    }
  },
  mounted: function () {
    this.search()
  }
}
</script>
