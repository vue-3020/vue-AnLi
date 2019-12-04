<template>
  <Card>
    <Form ref="exampleForm" :label-width="120">
      <FormItem label="附件：">
        <file-download :fileList="downList"></file-download>
      </FormItem>
    </Form>
  </Card>
</template>
<script>

import { FileDownload } from '@/components/files'
export default {

  data () {
    return {
      downList: []
    }
  },
  components: {
    FileDownload
  },
  methods: {
    initFiles () {
      this.downList = [{ attachmentID: '2b123c84-fd46-45ff-8e1e-8bf278770c97', attachmentName: '图片.png', attachmentType: 'image/png' }]
    }
  },
  mounted () {
    this.initFiles()
  }
}
</script>
