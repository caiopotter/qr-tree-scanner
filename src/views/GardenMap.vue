<template>
  <v-container class="map-auto-fill">
      <l-map
        :preferCanvas="true"
        :zoom="zoom"
        :minZoom="18"
        :maxZoom="19"
        :center="center"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
      <l-tile-layer :options="{ maxZoom: 19, preferCanvas:true }" :url="url"></l-tile-layer>
    </l-map>

  </v-container>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'GardenMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data: () => ({
    url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    zoom: 18,
    center: [-22.912068, -43.224742],
    bounds: undefined
  }),

  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    doSomethingOnReady(){
      console.log('pronto')
      this.map = this.$refs.myMap.mapObject
    },
  }

}
</script>
<style>
    .map-auto-fill{
        width: 100vw;
        overflow: hidden;
        padding: 0px !important;
        margin:-12px;
        height: 100vh;
        position: fixed;
    }
</style>