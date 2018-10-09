<template>
    <div class="FU">
      <div class="map">
        <baidu-map class="map" :center="center" :zoom="zoom">
          <bm-marker :position="points" :dragging="true" @mouseup="getPoints"></bm-marker>
        </baidu-map>
      </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      childMsg: '',
      //中心点
      center: {
        lng: 116.404,
        lat: 39.915
      },
      // 坐标
      points: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 15,
    }
  },
  methods: {
    //地图
    handler({
      BMap,
      map
    }) {
      console.log(BMap, map)
    },
    getPoints(e) {
      // this.model.CELL_LON = e.point.lng
      // this.model.CELL_LAT = e.point.lat
      console.log(e.point.lat);
      console.log(e.point.lng);
    },
  },
}
</script>
<style scoped>
.map {
    width: 100%;
    height: 500px;
    background: #CCC;
}
</style>
