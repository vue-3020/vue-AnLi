<template>
  <div class="app-container">
    <!-- 学习循环绑定数据 -->
    <div class="filter-container">
      <el-checkbox-group v-model="formThead">
        <el-checkbox label="apple">第一个</el-checkbox>
        <el-checkbox label="banana">第二个</el-checkbox>
        <el-checkbox label="orange">第三个</el-checkbox>
      </el-checkbox-group>
    </div>

    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="name" label="fruitName" width="180">
      </el-table-column>
      <el-table-column :key='fruit' v-for='fruit in formThead' :label="fruit">
        <template slot-scope="scope">
          {{scope.row[fruit]}} --- {{fruit}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: 'fruit-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'fruit-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ],
      formThead: ['apple', 'banana']
    }
  }
}
</script>
