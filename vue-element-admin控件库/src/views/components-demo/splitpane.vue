<template>
  <div class="components-container">
    <code>
      <strong>SplitPane</strong> If you've used
      <a href="http://codepen.io/" target="_blank"> codepen</a>,
      <a href="https://jsfiddle.net/" target="_blank"> jsfiddle </a>will not be unfamiliar.
      <a href="https://github.com/PanJiaChen/vue-split-pane" target='_blank'> Github repository</a>
    </code>
    <split-pane v-on:resize="resize" split="vertical">
      <template slot="paneL">
        <div class="left-container">
          12345678890
        </div>
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
            <div class="top-container">
              CodeMirror is a versatile text editor implemented in JavaScript for the browser. It is specialized for editing code, and comes with over 100 language modes and various addons that implement more advanced editing functionality. Every language comes with fully-featured code and syntax highlighting to help with reading and editing complex code. A rich programming API and a CSS theming system are available for customizing CodeMirror to fit your application, and extending it with new functionality. A rich programming API and a CSS theming system are available for customizing CodeMirror to fit your application, and extending it with new functionality. A rich programming API and a CSS theming system are available for customizing CodeMirror to fit your application, and extending it with new functionality.
            </div>
          </template>
          <template slot="paneR">
            <div class="bottom-container">
              bbbbbb
            </div>
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script>
import splitPane from 'vue-splitpane'

export default {
  name: 'splitpane-demo',
  components: { splitPane },
  methods: {
    resize() {
      console.log('resize')
    }
  }
}
</script>

<style  scoped>
.components-container {
  position: relative;
  height: 100vh;
}

.left-container {
  background-color: #f38181;
  height: 100%;
}

.right-container {
  background-color: #fce38a;
  height: 200px;
}

.top-container {
  background-color: #fce38a;
  width: 100%;
  height: 100%;
}

.bottom-container {
  width: 100%;
  background-color: #95e1d3;
  height: 100%;
}
</style>
