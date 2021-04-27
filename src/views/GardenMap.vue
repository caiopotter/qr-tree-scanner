<template>
  <v-container class="map-auto-fill">
      <l-map
        ref="map"
        :preferCanvas="true"
        :zoom="zoom"
        :minZoom="18"
        :maxZoom="20"
        :center="formatMapCenterCoordinates"
      >
      <l-tile-layer :options="{ maxZoom: 20, preferCanvas:true }" :url="url"></l-tile-layer>
      <l-circle-marker v-for="(tree, index) in parkTrees" :key="index" :lat-lng="formatCoordinates(tree)" :radius="7" :color="tree.id == selectedTree.id ? 'red' : 'green'" @click="toggleBottomSheet(tree)">
      </l-circle-marker>
      <l-control position="topleft">
        <v-btn color="white" :style="{'color':'var(--v-forest-base)'}" fab x-small @click="centralizeMap">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
      </l-control>
    </l-map>
    <v-bottom-sheet v-model="bottomSheet">
      <v-card>
        <v-card-title :style="{'background-color': 'var(--v-forest-base)', 'color': 'white'}">{{selectedTree.common_name}}
          <v-spacer></v-spacer>
          <v-icon @click="closeBottomSheet" style="color:white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <div :style="{'font-weight': 'bold'}" class="mt-2">{{userDiscoveryTreeDate()}}</div>
        </v-card-text>
        <v-card-actions :style="{'display':'grid'}">
          <v-btn :style="{'grid-column-start':'12'}" color="forest" outlined @click="goToDetails(selectedTree)">
            Detalhes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
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
    userTrees(){
      return this.$store.getters.userTrees
    },
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
    zoom: 19,
    bottomSheet: false,
    selectedTree: {}
  }),

  methods: {
    userDiscoveryTreeDate(){
      let selectedTreeDiscover = this.userTrees.filter(tree => (tree.id == this.selectedTree.id))
      if(selectedTreeDiscover.length > 0){
        return `Árvore descoberta em ${this.formatDateTime(selectedTreeDiscover[0].pivot.created_at)}!`
      }
      return "Árvore ainda não descoberta."
    },
    centralizeMap(event, center=undefined){
      if(!center){
        center = {lat:this.formatMapCenterCoordinates[0], lng:this.formatMapCenterCoordinates[1]}
      }
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
    formatDateTime(dateTime){
      return moment(dateTime).format("DD/MM/YYYY HH:mm:ss")
    },
    toggleBottomSheet(tree){
      if(tree.pivot && tree.pivot.map_latitude && tree.pivot.map_longitude){
        let coords = {lat:tree.pivot.map_latitude, lng:tree.pivot.map_longitude}
        this.centralizeMap(undefined, coords)
      }
      this.bottomSheet = true;
      this.selectedTree = tree;
    },
    goToDetails(tree){
      this.$store.commit('setScannedTree', tree)
      this.$store.commit('setMenuTitle', tree.common_name)
      this.$router.push('/colecao/detalhes')
    },
    closeBottomSheet(){
      this.selectedTree = {}
      this.bottomSheet = false;
    }
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