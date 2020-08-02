<template>
  <div>
    <!-- <input type="file" accept="image/*" @change="compressImg" capture="camera" /> -->
    <!-- <img src="../../assets/images/talkingdata.png" alt=""> -->
  </div>
</template>
<script>
// import '@/utils/lrz.bundle'
export default {
  data() {
    return {
      url: ''
    }
  },
  async mounted() {
    // let lrzImg = await this.getImgUrl(`talkingdata.png`, { width: 260, height: 'auto', quality: 0.7, filedName: '' })
    // let lrzImg = await this.getImgUrl('talkingdata', 0.7)
    // this.url = lrzImg
  },
  methods: {
    // async  getImgUrl(url, size) {
    //   let dataImg = await new Promise((resolve, reject) => {
    //     debugger

    //     lrz(require(`../../assets/images/${url}.png`), { quality: size }).then(function (rst) {
    //       console.log(rst)
    //       // rst.formData; //后端可处理的数据；
    //       // rst.file; //压缩后的file对象（默认应丢在rst.formData里面），需要注意的是：如果压缩率太大的话，这个会是原始的file对象；
    //       // rst.fileLen; //生成后的图片大小，后端可通过此值来校验是否传输完整;
    //       // rst.base64; //生成后的图片base64，后端可以处理此字符串为图片，也直接用于img.src = base64；
    //       // rst.base64Len; //生成后的base64的大小，后端可以通过此值来校验是否传输完整 (如果采用base64上传方式)；
    //       // rst.origin; //也就是原始的file对象，里面存了一些原始文件的信息，例如大小，日期等；
    //       resolve(rst)
    //     }).catch(function (err) {
    //       resolve(err)
    //     })
    //   })
    //   return dataImg
    // },
    compressImg(e) {

    }

  }
}
</script>