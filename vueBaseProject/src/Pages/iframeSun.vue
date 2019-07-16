<template>
  <div>
    <h3>iframe 的子页面</h3>
    <p>发送父页面，event.source.postMessage("传送给父页面的数据!", event.origin);</p>
    <p>父页面接收：window.addEventListener('message', event =>{console.log(2,event);});</p>
    <p>
      <h4 style="color:red" id="iframeText"></h4>
    </p>
    <p >
      <h4 style="color:red" id="canshu"></h4>
    </p>
    <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    <!-- <el-button type="primary" @click="add">主要按钮</el-button> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // input: '',
      // datas: ""
    };
  },
  mounted() {
    // var that = this;
    //发送给子页面
    // this.parentIframe();
    //接收父页面传过来的内容
    window.addEventListener("message", function(event) {
      console.log(1, event.data.cmd);
      debugger
      switch (event.data.cmd) {
        case 'returnFormJson':
          // 业务逻辑
          document.getElementById('iframeText').innerHTML = event.data.params;
          break
        case 'undefined':
          // 业务逻辑
          document.getElementById('iframeText').innerHTML = '没有获取到数据';
          break
      }
      // console.log('接收的数据  ' + event.data,event);
      // source 消息的发送给父页面窗口，
      // event.origin：要发送的地址
      // event.source.postMessage("传送给父页面的数据!111", event.origin);
    }, false)
  }
}
</script>

<style>
p {
  margin-top: 6px;
}
</style>
