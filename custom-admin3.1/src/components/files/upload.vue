<template>
  <div>
    <Upload ref="upload" multiple :action="actionUrl" :show-upload-list="false" :default-file-list="defaultFileList" :format="formats" :max-size="fileMaxSize*1024" :on-success="handleSuccess" :on-format-error="handleFormatError" :on-error="handelError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload">
      <Button icon="ios-cloud-upload-outline" type="primary">上传文件</Button>
      <span class="ivu-upload-remark">文件大小不能超过:{{fileMaxSize}}M；文件个数不能超过:{{fileLength}}个；文件格式：{{fileExtentionNames}}</span>
    </Upload>
    <ul class="ivu-upload-list">
      <li v-for="(item,index) in uploadList" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
        <template v-if="item.status === 'finished'">
          <span @click="handleView(item)">{{item.name}}</span>
          <i class="ivu-icon ivu-icon-ios-trash ivu-upload-list-remove" @click="handelRemove(item,index)"></i>
        </template>
        <template v-else>
          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
      </li>
    </ul>
    <Modal title="查看图片" v-model="previewVisible">
      <img :src="previewImgUrl" v-if="previewVisible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>

import { getToken } from '@/utils/auth'
import { removeFile } from '@/api/example'
export default {
  data() {
    return {
      tokenHeaders: { Authorization: getToken() },
      fileMaxSize: 2,
      uploadList: [],
      formats: ['jpg', 'jpeg', 'png', 'zip', 'txt', 'xls', 'pdf'],
      fileLength: 5,
      previewVisible: false,
      previewImgUrl: ''
    }
  },
  props: {
    action: String,
    defaultFileList: Array,
    sizeLimit: Number
  },
  methods: {
    handleView(file) {
      // if (file.type.indexOf('image') === 0) {
      //   this.previewImgUrl = file.url
      //   this.previewVisible = true
      // } else {

      // }
    },
    //上传失败或成功
    handleSuccess(res, file) {
      debugger
      if (res.code === 200) {
        let uploadFile = res.data
        debugger
        file.url = uploadFile.attachmentPath + '/' + uploadFile.realName
        file.name = uploadFile.attachmentName
        this.$Message.success('上传成功')
      } else {
        this.$Message.error('上传失败')
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式错误',
        desc: '文件： ' + file.name + ' 的格式不正确, 正确的格式为：' + this.fileExtentionNames
      })
    },
    handelError(error, file) {
      this.$Notice.warning({
        title: '上传出错',
        desc: '文件  ' + file.name + ' 上传出错：' + error
      })
    },
    handelRemove(file, index) {
      let _this = this
      _this.$Modal.confirm({
        title: '确认删除？',
        onOk: () => {
          removeFile(file.attId).then(res => {
            const fileList = _this.$refs.upload.fileList
            _this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
            _this.$Message.success('删除成功')
          })
        }
      })
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: '超出文件最大值设置',
        desc: '文件  ' + file.name + ' 太大, 不能超过' + this.fileMaxSize + 'M.'
      })
    },
    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
    handleBeforeUpload(file) {
      console.log(file)
      debugger
      const check = this.uploadList.length < this.fileLength
      if (!check) {
        this.$Notice.warning({
          title: '文件数量不能超出' + this.fileLength + '.'
        })
      } else {
        this.uploadList.push({ uid: file.lastModified, name: file.name, status: 'finished', url: file.webkitRelativePath })
      }
      return check
    },
    //显示在页面
    fileIds() {
      let result = this.uploadList.map(el => {
        if (!(el.id)) {
          return el.id
        }
      }).join(',')
      return result
    },
    // getFileIcon (attType) {
    //   if (!attType) return ''
    //   console.log(attType)
    //   let type = attType.split('/')[0]
    //   if (type === 'img' || type === 'IMG') {
    //     return 'ivu-icon-ios-image'
    //   } else {
    //     return 'ivu-icon-ios-stats'
    //   }
    // },
    initFiles() {
      if (this.sizeLimit) {
        this.fileMaxSize = this.sizeLimit
      }
    }
  },
  computed: {
    fileExtentionNames() {
      return this.formats.join(',')
    },
    //上传地址
    actionUrl() {
      if (this.action) {
        return this.action
      } else {
        // return this.$appConst.fileUploadUrl
        return `http://152.136.36.250:4090/fs/fileupload`
      }
    }
  },
  watch: {
    defaultFileList(list) {
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList

      })

      // if (this.uploadList.length === 0) {
      //   list.forEach(el => {
      //     this.uploadList.push(el)
      //   })
      // }
    }
  },
  mounted() {
    this.initFiles()
    // this.uploadList = this.$refs.upload.fileList
  }
}
</script>
<style>
.ivu-upload-remark {
  padding-left: 10px;
}
.file-list {
  font-size: 20px;
}
.file-list span {
  font-size: 20px;
}
/* .file-list {
  padding: 4px;
  color: #515a6e;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
} */
.custom-upload {
  height: 36px;
}
.file-title {
  font-size: 16px;
}
.upload-btn {
  float: right;
}
/* .ivu-upload-list-remove {
  opacity: 0;
  font-size: 18px;
  cursor: pointer;
  float: right;
  margin-right: 4px;
  color: #999;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
.ivu-icon {
  display: inline-block;
  font-family: "Ionicons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
} */
</style>
