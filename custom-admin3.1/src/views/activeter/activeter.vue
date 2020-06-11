<template>
  <Card>
    只有在和keep-alive 缓存下应该才会起作用
  </Card>
</template>
<script>
export default {
  data() {
    return {
      htmlmodel: ''
    }
  },
  activated() {
    console.log(111)
  }
}
</script>
