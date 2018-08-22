<template>
  <iframe id="down-file-iframe">
    <form target="_self" method="${config.method}" action="${config.url}?tokenID=${Cookies.get("Tescomm_Access_Token")}">

    </form>
  </iframe>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('user', ['getUserName'])
  },
  methods: {
    DownLoadFile() {

    },
    exportExcel(options) {
      let _this = this
      if (!options.captions || !options.columns || !options.url) return;
      var exportData = {};
      exportData.url = options.url;
      exportData.data = {};
      if (options.captions instanceof Array) {
        exportData.data.captions = options.captions.join(",");
      } else {
        exportData.data.captions = options.captions;
      }
      if (options.columns instanceof Array) {
        exportData.data.columns = options.columns.join(",");
      } else {
        exportData.data.columns = options.columns;
      }
      let typeslength = exportData.data.columns.split(",").length;
      if (!options.types) {
        var types = [];
        for (var i = 0; i < typeslength; i++) {
          types.push("string");
        }
        exportData.data.types = types.join(",");
      } else {
        if (options.types instanceof Array) {
          exportData.data.types = options.types.join(",");
        } else {
          exportData.data.types = options.types;
        }
      }
      exportData.data.condition = options.condition;
      exportData.data.fileName = options.fileName;
      _this.DownLoadFile(exportData);
    }
  }
}
</script>

