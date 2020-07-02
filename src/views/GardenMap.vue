<template>
  <v-container>
      
        
          <div class="img-wrapper">
            <img src="../assets/mapaBosque.jpeg" usemap="#usemap">

            <map name="usemap">
              <area @click="showMapBottomSheet('Árvore 1')" target="" alt="Arvore 1" title="Arvore 1" href="#" coords="567,838,13" shape="circle">
              <area @click="showMapBottomSheet('Árvore 2')" target="" alt="Arvore 2" title="Arvore 2" href="#" coords="719,1009,11" shape="circle">
              <area @click="showMapBottomSheet('Árvore 3')" target="" alt="Arvore 3" title="Arvore 3" href="#" coords="777,750,11" shape="circle">
              <area @click="showMapBottomSheet('Árvore 4')" target="" alt="Arvore 4" title="Arvore 4" href="#" coords="689,448,10" shape="circle">
            </map>
          </div>
       
      
        <v-bottom-sheet v-model="mapBottomSheet">
          <v-card>
            <v-card-title>
                <v-row>
                    <v-col cols="11" class="text-center ml-2" :style="{'color': 'var(--v-forest-base)', 'font-weight':'bold'}">
                        {{bottomSheetText}}
                    </v-col>
                    <v-col cols="1" style="position: absolute; right: 15%;">
                        <v-btn text @click="mapBottomSheet = false">
                            <v-icon style="color: red">mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-subtitle>
                <v-flex xs12 class=" mt-2" :style="{'font-weight':'bold', 'color': 'grey'}">
                    Texto de exemplo
                </v-flex>
            </v-card-subtitle>
          </v-card>
        </v-bottom-sheet>
        
  </v-container>
</template>

<script>
import imageMap from "image-map";
export default {
    name: "GardenMap",
    data: () => ({
      mapBottomSheet: false,
      bottomSheetText: '',
    }),

    computed: {
    },

    methods: {
      showMapBottomSheet(text){
        this.bottomSheetText = text;
        this.mapBottomSheet = true;
      }
    },
    mounted(){
      imageMap('img[usemap]')
    }
}
</script>

<style>
.img-wrapper {
    overflow: auto;
    position: absolute;
    top: 0%;
    left: 0%;
}

.img-wrapper > img {
    height: 200%;
    width: 200%;
    vertical-align: bottom;
}

</style>