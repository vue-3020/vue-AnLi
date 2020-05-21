
<template>
  <div>
    <h1 style="margin-left:50px">  对数组，对象， 数组对象, 的深度监听</h1>
    <br>
    <Button @click="addObj" type="primary">设置对象</Button>
    <Button @click="addArgs" type="primary">设置数组</Button>
    <Button @click="addObjArrData" type="primary">设置对象数组</Button>
    <Button @click="addArrayOItem" type="primary">设置数组对象</Button>
    <Button @click="arrObjArrObj" type="primary">特别深的监听</Button>
  </div>
</template>
<script>

export default {
  name: 'demo11',
  props: [],
  data() {
    return {
      obj_item: {},
      args_item: [],
      obj_arr_item: {
        item: [1, 2, 3, 4, 5, 6],
        item2: ['a', 'b', 'c', 'd', 'e'],
      },
      array_obj_item: [
        { id: 1, name: '李沁', age: 19 },
        { id: 2, name: '若君', age: 20 }
      ],
      arr_obj_arr_obj: [
        {          id: 1,
          item: [
            {
              id: '1_1',
              c_item: [
                {
                  id: '1_1_1',
                  name: '底层'
                }
              ]
            }
          ]
        },
      ]
    }
  },
  watch: {
    //这样就可以监听到
    obj_item(to, form) {
      console.log(`监听对象`, to, form)
    },
    //监听数组
    args_item(to, form) {
      console.log(`监听数组`, to, form)
    },
    //监听对象数组  
    obj_arr_item(to, form) {
      console.log(`监听外层对象变化数组`, to, form)
    },
    array_obj_item(to, form) {
      console.log(`监听数组中的对象变化`, to, form)
    },
    arr_obj_arr_obj: {
      handler(newName, oldName) {
        console.log(`监听多层`, newName, oldName)
      },
      immediate: true, //。如果我们需要在最初绑定值的时候也执行函数
      deep: true // 代表在wacth里声明了arr_obj_arr_obj这个方法之后立即先去执行handler方法
    }
  },
  methods: {
    randomString(len) {
      len = len || 32;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var maxPos = $chars.length;
      var pwd = '';
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    //添加对象
    addObj() {
      let mackId = this.randomString(5)
      //这样方式无法通知对象更新
      this.$set(this.obj_item, mackId, mackId) //{iSpCA: "iSpCA"}
      //这种方式无法监听到数据变化
      //   this.obj_item[mackId] = mackId //这样监听不到
    },
    //添加 数组
    addArgs() {
      let mackId = this.randomString(5)
      this.args_item.push(mackId)
    },
    //添加内容
    addObjArrData() {
      let mackId = this.randomString(6)
      //增加对象没有问题
      //   this.$set(this.obj_arr_item, mackId, mackId)

      //给对象中的数组添加 有问题 watch获取不到
      this.obj_arr_item.item[this.obj_arr_item.item.length] = mackId

      //解决办法 ,给子元素增加内容
      this.$set(this.obj_arr_item.item, mackId)
      console.log(this.obj_arr_item)
    },
    //数组对象添加
    addArrayOItem() {
      let mackId = this.randomString(4)
      let obj = {}
      //添加watch监听不到
      //   obj[mackId] = mackId
      //   this.array_obj_item.push(obj)

      //修改
      this.array_obj_item.map(item => {
        if (item.id == 1) {
          //修改后watch监听不到
          //   item.name = '李小冉'; //修改监听不到
          //   item[mackId] = mackId; //添加监听不到

          //解决办法,
          this.$set(item, mackId, mackId)
          this.$set(item, 'name', '李小冉')
        }
      })
    },
    //多层的监听
    arrObjArrObj() {
      //无法监听
      this.$set(this.arr_obj_arr_obj[0].item[0].c_item[0], 'name', '从新设置')
      debugger
    }
  },
  components: {}
}
</script>
 
<style scoped>
button{margin-left: 20px;}
</style>