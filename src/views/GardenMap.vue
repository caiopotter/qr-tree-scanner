<template>
  <v-container class="map-auto-fill">
      <l-map
        :preferCanvas="true"
        :zoom="zoom"
        :minZoom="16"
        :maxZoom="19"
        :center="formatMapCenterCoordinates"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
      <l-tile-layer :options="{ maxZoom: 19, preferCanvas:true }" :url="url"></l-tile-layer>
      <l-circle-marker v-for="(tree, index) in parkTrees" :key="index" :lat-lng="formatCoordinates(tree)" :radius="5" :color="'green'">
        <l-popup>{{tree.common_name}}</l-popup>
      </l-circle-marker>
    </l-map>

  </v-container>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LGeoJson, LCircleMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'GardenMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
    LCircleMarker,
    LPopup
  },
  computed:{
    parkTrees(){
      return this.$store.getters.selectedParkTrees
    },
    selectedPark(){
      return this.$store.getters.selectedPark;
    },
    formatMapCenterCoordinates(){
      let park = this.$store.getters.selectedPark;
      let coords = [];
      if((!park.map_center_latitude) || (!park.map_center_longitude)){
        return [-22.912068, -43.224742]
      }
        coords.push(park.map_center_latitude);
        coords.push(park.map_center_longitude);
        return coords;
    }
  },
  data: () => ({
    url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    zoom: 17,
    bounds: undefined,
  }),

  methods: {
    formatCoordinates(tree){
      let latlng = [];
      if(tree && tree.pivot && tree.pivot.map_latitude && tree.pivot.map_longitude){
        latlng.push(tree.pivot.map_latitude)
        latlng.push(tree.pivot.map_longitude)
      }else{
        latlng = ['0', '0']
      }
      return latlng;
    },
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