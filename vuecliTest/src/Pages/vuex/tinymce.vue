<template>
  <div>
    <tinymce :height="300" v-model="newEntity"></tinymce>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  data() {
    return {
      newEntity:''
    }
  },
  components: {
    Tinymce
  },
}
</script>
<style scoped>
</style>