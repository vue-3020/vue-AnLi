<template>
  <div>
    <Card>
      <Form ref="exampleForm" :model="exampleForm" :label-width="120">
        <FormItem label="姓名">
          <Input v-model="exampleForm.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="地址">
          <Input v-model="exampleForm.address" placeholder="请输入地址"></Input>
        </FormItem>
        <Row>
          <Col span="24">
            <file-upload
              ref="appupload"
              style="margin-left:120px"
              :defaultFileList="defaultList"
              :sizeLimit="sizeLimit"
            ></file-upload>
          </Col>
        </Row>

        <FormItem class="form-right-group">
          <Button type="primary" @click="handleSubmit">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
import { FileUpload } from '@/components/files'
export default {

  data () {
    return {
      fileList: [],
      defaultList: [],
      sizeLimit: 2,
      exampleForm: {
        id: '',
        name: ''
      }
      // actionUrl: '',
    }
  },
  components: { FileUpload },
  methods: {
    handleSubmit () {
      let _this = this
      this.$refs.exampleForm.validate((valid) => {
        _this.$Message.success('提交成功')
      })
    },
    handleReset () {
      this.$refs.exampleForm.resetFields()
    },
    initialFiles () {
      this.defaultList = [
        { uid: 1, name: 'food.jpeg', status: 'finished', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { uid: 2, name: 'food2.jpeg', status: 'finished', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { uid: 3, name: '测试文件.xls', status: 'finished', url: 'http://localhost:8078/testfile1.xls' }
      ]
    }
  },
  mounted () {
    this.initialFiles()
  }

}
</script>
