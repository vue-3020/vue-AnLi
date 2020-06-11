<template>
  <div>
   <Input   placeholder="Enter something..." style="width: 300px" />
  </div>
</template>
<script>
export default {
   data() {
    return {
      // onBarcodeScanned: null
    }
  },
  created() {
    //  添加条形码扫描侦听器并传递回调函数
    console.log(this.$barcodeScanner)
    this.$barcodeScanner.init(this.onBarcodeScanned)
  },
  destroyed() {
    //  销毁组件时删除侦听器
    this.$barcodeScanner.destroy()
  },
  methods: {
    //  创建回调函数，以便在扫描仪完成后接收条形码
    onBarcodeScanned(barcode) {
      console.log(barcode)
      // do something...
    },
    //  在输入之前重置为最后一个条形码(输入框中的任何内容)
    resetBarcode() {
      let barcode = this.$barcodeScanner.getPreviousCode()
      // do something...
    }
  }
}
</script>
