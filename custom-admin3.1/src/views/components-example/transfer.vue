<template>
  <Card>
    <Transfer
      :data="sourceList"
      :target-keys="targetList"
      filterable
      :titles="['待选择列表','已选择列表']"
      filter-placeholder="请输入姓名"
      :list-style="transferStyle"
      :filter-method="filterMethod"
      :render-format="handRender"
      @on-change="handleChange2"
    ></Transfer>
  </Card>
</template>
<script>
import { fetchList } from '@/api/example'
export default {
  data () {
    return {
      sourceList: [],
      targetList: [],
      transferStyle: {
        width: '350px',
        height: '500px'
      }
    }
  },
  methods: {
    handleChange2 (newTargetKeys) {
      this.targetList = newTargetKeys
    },
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1
    },
    handRender (item) {
      return item.label + ' - ' + (item.gender === 1 ? '男' : '女')
    },
    initialData () {
      let _this = this
      fetchList().then(res => {
        res.data.forEach(el => {
          _this.sourceList.push(
            { key: el.id,
              label: el.name,
              gender: el.gender,
              disabled: el.gender === 0
            })
        })
      })
    }
  },
  mounted () {
    this.initialData()
  }
}
</script>
