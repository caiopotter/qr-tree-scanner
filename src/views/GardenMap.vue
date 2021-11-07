<template>
  <v-container class="map-auto-fill">
      <l-map
        ref="map"
        :preferCanvas="true"
        :zoom="zoom"
        :minZoom="18"
        :maxZoom="19"
        :center="formatMapCenterCoordinates"
      >
      <l-tile-layer :options="{ maxZoom: 19, preferCanvas:true }" :url="url"></l-tile-layer>
      <l-control-scale position="topright" :imperial="false" :metric="true"></l-control-scale>
      <l-circle-marker v-for="(tree, index) in parkTrees" :key="index" :lat-lng="formatCoordinates(tree)" :radius="7" :color="tree.id == selectedTree.id ? 'red' : userTrees.map(tr => {return tr.id}).indexOf(tree.id) > -1 ? 'green' : 'yellow'" @click="toggleBottomSheet(tree)">
        <l-tooltip>{{tree.common_name}}</l-tooltip>
      </l-circle-marker>
      <l-control position="topleft">
        <v-btn color="white" :style="{'color':'var(--v-forest-base)'}" fab x-small @click="centralizeMap">
          <v-icon>mdi-crosshairs-gps</v-icon>
        </v-btn>
        <br>
        <v-btn class="mt-2" color="white" :style="{'color':'var(--v-forest-base)'}" fab x-small @click="openSubtitleHelp">
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </l-control>
    </l-map>
    <v-bottom-sheet :max-width="500" @click:outside="closeBottomSheet" v-model="bottomSheet">
      <v-card>
        <v-card-title :style="{'background-color': 'var(--v-forest-base)', 'color': 'white'}">{{selectedTree.common_name}}
          <v-spacer></v-spacer>
          <v-icon @click="closeBottomSheet" style="color:white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <div :style="{'font-weight': 'bold'}" class="mt-2">{{userDiscoveryTreeDate()}}</div>
        </v-card-text>
        <v-card-actions :style="{'display':'grid'}">
          <v-btn :style="{'grid-column-start':'12', 'color': 'white'}" color="forest" @click="goToDetails(selectedTree)">
            Explorar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
    <v-bottom-sheet :max-width="500" @click:outside="closeBottomSheet" v-model="subtitleHelp">
      <v-card>
        <v-card-title :style="{'background-color': 'var(--v-forest-base)', 'color': 'white'}">Legenda
          <v-spacer></v-spacer>
          <v-icon @click="closeSubtitleHelp" style="color:white">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <div :style="{'font-weight': 'bold'}" class="mt-2">
            <v-row>
              <v-col cols="1">
                <v-badge class="green-badge" bordered color="green"></v-badge>
              </v-col>
              <v-col>
                <span>Árvore explorada</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-badge class="yellow-badge" bordered color="yellow"></v-badge>
              </v-col>
              <v-col>
                <span>Árvore não explorada</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-badge class="red-badge" bordered color="red"></v-badge>
              </v-col>
              <v-col>
                <span>Árvore selecionada</span>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker, LControlScale, LControl, LGeoJson, LCircleMarker, LPopup, LTooltip } from 'vue2-leaflet';

export default {
  name: 'GardenMap',
  components: {
    LMap,
    LControl,
    LTileLayer,
    LMarker,
    LGeoJson,
    LCircleMarker,
    LControlScale,
    LPopup,
    LTooltip
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
    },
    userIsVisitor(){
      return this.$store.getters.isVisitor
    }
  },
  data: () => ({
    //url: `https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=${process.env.MAP_API_KEY}`,
    url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    zoom: 19,
    bottomSheet: false,
    subtitleHelp: false,
    selectedTree: {}
  }),

  methods: {
    userDiscoveryTreeDate(){
      let selectedTreeDiscover = this.userTrees.filter(tree => (tree.id == this.selectedTree.id))
      if(selectedTreeDiscover.length > 0){
        if(selectedTreeDiscover[0].pivot && selectedTreeDiscover[0].pivot.created_at){
          return `Árvore descoberta em ${this.formatDateTime(selectedTreeDiscover[0].pivot.created_at)}`
        }
        return "Árvore descoberta!"
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
    openSubtitleHelp(){
      this.subtitleHelp = true;
    },
    closeSubtitleHelp(){
      this.subtitleHelp = false;
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
      this.exploreNewTrees(tree);
      this.$store.commit('setScannedTree', tree)
      this.$store.commit('setMenuTitle', tree.common_name)
      this.$router.push('/colecao/detalhes')
    },
    exploreNewTrees(tree){
      if(this.userTrees.map(tr => {return tr.id}).indexOf(tree.id) == -1){
        if(!this.userIsVisitor){
          this.$store.dispatch('setTreeDiscovered', tree.id);
        }
        this.$store.commit('addTreeToUserDiscoveredTreesArray', tree);
      }
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

    .green-badge .v-badge__badge::after{
      border-color: #256100 !important;
    }
    .yellow-badge .v-badge__badge::after{
      border-color: #bbb800 !important;
    }
    .red-badge .v-badge__badge::after{
      border-color: #790000 !important;
    }
</style>