<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  data () {
    return {
      editor: '',
      editorContent: ''
    }
  },
  props: ['catchData'], // 接收父组件的方法
  methods: {
    Setter (value) {
      this.editor.txt.html(value)
    },
    Getter () {
      return this.editor.txt.html()
    },
    Disabled () {
      this.editor.$textElem.attr('contenteditable', false)
    },
    Abled () {
      this.editor.$textElem.attr('contenteditable', true)
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editorElem) // 创建富文本实例
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html
      this.catchData(html) // 把这个html通过catchData的方法传入父组件
    }
    this.editor.customConfig.uploadImgServer = (process.env.NODE_ENV === 'production' ? this.$config.baseUrl.pro : this.$config.baseUrl.dev) + this.$config.uploadFileUrl
    // this.editor.customConfig.uploadImgServer = 'http://10.10.102.226:8080/api/file/editorUpload'
    this.editor.customConfig.uploadFileName = 'fileName'
    this.editor.customConfig.zIndex = 100
    // this.editor.customConfig.uploadImgHeaders = {
    //  'Authorization': this.$base.GetCookie(this.$types.SET_TOKEN)
    // 'Authorization': 'ef0e826d-4ed6-4cae-aff5-55c64e1bc536'
    // }
    this.editor.customConfig.menus = [ // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    this.editor.customConfig.uploadImgParams = {
      RequestURL: (process.env.NODE_ENV === 'production' ? this.$config.baseUrl.pro : this.$config.baseUrl.dev)
    }
    let _this = this
    this.editor.customConfig.customAlert = function (info) {
      // info 是需要提示的内容
      _this.$message.error(info)
    }

    this.editor.customConfig.uploadImgHooks = {
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        _this.$message.success('上传图片成功')
      },

      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        insertImg(result.data)

        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }
    this.editor.create()
  }
}
</script>
