<template>
  <div style="width:500px;margin:100px auto">
    <h1>不通的删除的方法</h1>
    <List header="Header" footer="Footer" border>
      <ListItem v-for="(item,index) in list" :key="item.id">
        <div class="flaf">
          <div> {{item.name}}</div>
          <div>
            <Button @click.native="del(item.id)" type="primary">some删除</Button>
            <Button @click.native="del2(item.id)" type="dashed">findIndex删除</Button>
          </div>
        </div>
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      name: '',
      list: [
        { id: 1, name: '惊鲵' },
        { id: 2, name: '掩日' },
        { id: 3, name: '黑白玄翦1' },
        { id: 4, name: '黑白玄翦32' },
        { id: 5, name: '黑白玄翦3' },
        { id: 6, name: '黑白玄翦4' },
        { id: 7, name: '黑白玄翦5' },
      ]
    }
  },
  methods: {//methods中定义了当前vue实例中所有可用的方法
    del(id) {
      //可能不适合多个删除
      this.list.some((item, i) => { //可以获取索引
        if (item.id == id) {
          this.list.splice(i, 1)
          //在数组的some方法中，如果return true，就会立即终止这个数组的后续循环
          return true
        }
      })
    },
    del2(id) {
      //获取当前索引
      this.list.splice(this.list.findIndex(item => item.id == id), 1)
    }

    //查询是否包含

  }
}
</script>
<style scoped  lang="less">
.flaf {
  display: flex;
  width: 100%;
  justify-content: space-between;
  button {
    margin: 0 10px;
  }
}
</style>
