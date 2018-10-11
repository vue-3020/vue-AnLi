<template>
  <div class="FU">
    <!-- <chart style="height:300px;width:100%;background:pink" :options="pie" :init-options="initOptions" ref="pie" auto-resize /> -->
  </div>
</template>

<script>
import qs from 'qs'

// import ECharts from 'vue-echarts'



// import 'echarts/lib/chart/pie'
// 工具
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/polar'
// import 'echarts/lib/component/geo'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/title'
// import 'echarts/lib/component/visualMap'
// import 'echarts/lib/component/dataset'


// import logo from './data/logo'
// import getBar from './data/bar'
// import pie from './data/pie'

// import polar from './data/polar'
// import scatter from './data/scatter'
// import map from './data/map'

// import theme from './data/theme.json'
// ECharts.registerTheme('ovilia-green', theme)

export default {
  data() {
    let options = qs.parse(location.search, { ignoreQueryPrefix: true })
    return {
      options,
      initOptions: {
        renderer: options.renderer || 'canvas'
      },
      pie,
    }
  },
  components: {
    chart: ECharts,
  },
}
</script>
<style>
.FU{height: 300px;background: #fff}
</style>
