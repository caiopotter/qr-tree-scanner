<template>
  <v-container class="map-auto-fill">
      <l-map
        ref="map"
        :preferCanvas="true"
        :zoom="zoom"
        :minZoom="16"
        :maxZoom="20"
        :center="formatMapCenterCoordinates"
      >
      <l-tile-layer :options="{ maxZoom: 20, preferCanvas:true }" :url="url"></l-tile-layer>
      <l-circle-marker v-for="(tree, index) in parkTrees" :key="index" :lat-lng="formatCoordinates(tree)" :radius="5" :color="'green'">
        <l-popup>{{tree.common_name}}</l-popup>
      </l-circle-marker>
      <l-control position="topleft">
        <v-btn color="white" :style="{'color':'var(--v-forest-base)'}" fab x-small @click="centralizeMap">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </l-control>
    </l-map>

  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker, LControl, LGeoJson, LCircleMarker, LPopup } from 'vue2-leaflet';

export default {
  name: 'GardenMap',
  components: {
    LMap,
    LControl,
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
  }),

  methods: {
    centralizeMap(){
      let center = {lat:this.formatMapCenterCoordinates[0], lng:this.formatMapCenterCoordinates[1]}
      this.$refs.map.mapObject.panTo(center)
    },
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