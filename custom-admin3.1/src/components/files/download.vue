
<template>
  <div>
    <ul class="ivu-upload-list">
      <li v-for="(item,index) in downList" :key="index" class="ivu-upload-list-file ivu-upload-list-file-finish">
        <span @click="download(item)">{{item.attachmentName}}</span>
        <i
          class="ivu-icon ivu-icon-ios-trash ivu-upload-list-remove"
          @click="handelRemove(item,index)"
        ></i>
      </li>
    </ul>

    <Table height="200" :columns="columns1" :data="data2"></Table>

  </div>
</template>
<script>
/* 下载附件 */
import { downloadfile } from '@/api/example'
export default {
  name: '',
  data() {
    return {
      downList: [],
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data2: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }

  },
  props: {
    fileList: Array
  },
  methods: {
    download(item) {
      let options = {
        url: this.$appConst.fileDownloadUrl,
        fileName: item.attachmentName,
        data: { attachmentID: item.attachmentID, attachmentName: item.attachmentName }
      }
      downloadfile(options)
    },
    getFileIcon(attType) {
      if (!attType) return ''
      let type = attType.split('/')[0]
      if (type === 'img' || type === 'IMG') {
        return 'ivu-icon-ios-image'
      } else {
        return 'ivu-icon-ios-stats'
      }
    }
  },
  watch: {
    fileList(list) {
      this.downList = list
    }
  },
  mounted: function () { // 页面初始化执行绑定 在父页面的mounted之前执行

  }
}
</script>
