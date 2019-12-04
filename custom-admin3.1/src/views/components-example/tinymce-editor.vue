<template>
  <div class="tinymce">
    <h1>tinymce</h1>
    <Editor id="tinymce" v-model="tinymceHtml" :init="init"></Editor>
    <div v-html="tinymceHtml"></div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import { uploadFile } from '@/api/example'
export default {
  name: 'tinymce',
  data () {
    return {
      tinymceHtml: '请输入内容',
      init: {
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 300,
        image_advtab: true,
        plugins: 'link lists image imagetools code table wordcount',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        branding: false,
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true, // 图片异步上传处理函数
        images_upload_handler: (blobInfo, success, failure) => {
          alert('test')
          console.log(blobInfo)
          this.handleImgUpload(blobInfo, success, failure)
        }
      }
    }
  },
  components: { Editor },
  methods: {

    handleImgUpload (blobInfo, success, failure) {
      let formdata = new FormData()
      formdata.set('upload_file', blobInfo.blob())
      let imgurl = '@/mock/file/test.png'
      uploadFile(formdata).then(res => {
        console.log(res)
        success(imgurl)
      }).catch(res => {
        failure('error')
      })
    }
  },
  mounted () {
    tinymce.init({})
  }
}
</script>
