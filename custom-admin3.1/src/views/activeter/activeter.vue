<template>
  <Card>
   <p> 只有在和keep-alive 缓存下应该才会起作用</p>
   <br>
   <br>
   <br>
   <br>
   <br>
   <h2>点击单点登录</h2>
   <p><Button @click="JumpPage" type="primary">点击页面跳转 需要打开 vueWuxinkai这些系统</Button></p>
  </Card>
</template>
<script>
import agentPostMessage from "@/utils/sys_utils/agent_postMessage"
export default {
  data() {
    return {
      htmlmodel: ''
    }
  },
  activated() {
    console.log(111)
  },
  methods:{
    JumpPage(){
      debugger
       let url =`http://localhost:1989` + "/#/agent?id_t=77777"
        + "&id_1=" + '111111'
        + "&id_2=" + '222222'
        + "&id_3=" + '333333'
      agentPostMessage(url);
    }
  }
}
</script>
