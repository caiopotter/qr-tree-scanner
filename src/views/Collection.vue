<template>
  <v-container>
        <v-row v-if="isSpecificPark">
            <v-col cols="12">
                <span style="font-weight: bold; font-size: 1.3em">Parque selecionado:</span>
            </v-col>
            <v-col class="mt-n6" cols="12">
                <span style="font-weight: bold; font-size: 0.9em">{{selectedParkName}}</span>
            </v-col>
            <v-col cols="12" class="mt-n2">
                <v-progress-circular v-if="loading" indeterminate color=forest></v-progress-circular>
                <span v-else style="font-weight: bold; font-size: 0.9em">{{userDiscoveredTreesByPark.length}} de {{parkTreesNumber}} árvores descobertas</span>
            </v-col>
            <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3" v-for="(tree, index) in userDiscoveredTreesByPark" :key="index">
                <tree-card :treeNumber="index+1" :tree="tree" :discovered="true" @details="details"></tree-card>
            </v-col>
            <v-col cols="12" class="mt-6" v-if="userRemainingTreesByPark > 0">
                <span style="font-weight: bold; font-size: 1.3em">Árvores restantes:</span>
            </v-col>
            <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3" v-for="(n) in userRemainingTreesByPark" :key="userDiscoveredTreesByPark.length + n -1">
                <tree-card class="mb-2" :treeNumber="userDiscoveredTreesByPark.length + n" :discovered="false"></tree-card>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <span style="font-weight: bold; font-size: 1.3em">Sua coleção:</span>
            </v-col>
            <v-col cols="12" class="mt-n6">
                <v-progress-circular v-if="loading" indeterminate color=forest></v-progress-circular>
                <span v-else style="font-weight: bold; font-size: 0.9em">{{discoveredTrees.length}} de {{storedTrees}} árvores descobertas</span>
            </v-col>
            <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3" v-for="(tree, index) in discoveredTrees" :key="index">
                <tree-card :treeNumber="index+1" :tree="tree" :discovered="true" @details="details"></tree-card>
            </v-col>
            <v-col cols="12" class="mt-6" v-if="remainingTreesNumber > 0">
                <span style="font-weight: bold; font-size: 1.3em">Árvores restantes:</span>
            </v-col>
            <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3" v-for="(n) in remainingTreesNumber" :key="discoveredTrees.length + n -1">
                <tree-card class="mb-2" :treeNumber="discoveredTrees.length + n" :discovered="false"></tree-card>
            </v-col>
        </v-row>
        <v-row v-if="(parkTreesNumber == 0) && !isLoading">
            <v-card flat>
                <v-img
                    :src="require('@/assets/pequenaFlorestaCinzaSemFundoIcone.png')"
                    height="200px"
                ></v-img>
                <v-card-text>Nenhuma árvore adicionada nesse parque</v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import TreeCard from '@/components/TreeCard';

export default {
  name: 'Collection',
  components: {
    TreeCard
  },
  data: () => ({
      userDiscoveredTreesByPark: [],
      userRemainingTreesByPark: 0,
      loading: false,
  }),

  mounted(){
      this.waitforParkQueries();
  },

  computed: {
      storedTrees(){
          return this.$store.getters.storedTrees;
      },
      discoveredTrees(){
          return this.$store.getters.userTrees;
      },
      remainingTreesNumber(){
          if(this.$store.getters.storedTrees - this.$store.getters.userTrees.length > 0)
          return this.$store.getters.storedTrees - this.$store.getters.userTrees.length;
      },
      parkTrees(){
          if(this.$store.getters.selectedPark.id != undefined){
              return this.$store.getters.selectedParkTrees
          }
          return 0;
      },
      parkTreesNumber(){
          if(this.$store.getters.selectedPark.id != undefined){
              return this.$store.getters.selectedParkTrees.length
          }
          return 0;
      },
      isSpecificPark(){
          if(this.$store.getters.selectedPark.id != undefined){
              return true
          }
          return false;
      },
      selectedParkName(){
          if(this.$store.getters.selectedPark.id != undefined){
              return this.$store.getters.selectedPark.name
          }
      },
      selectedParkId(){
          if(this.$store.getters.selectedPark.id != undefined){
              return this.$store.getters.selectedPark.id
          }
      },
      isLoading(){
          return this.$store.getters.loading
      }
  },

  methods: {
    details(tree){
        this.$store.commit('setScannedTree', tree)
        this.$store.commit('setMenuTitle', tree.common_name)
        this.$router.push('/colecao/detalhes')
    },
    waitforParkQueries(){
        this.loading = true;
        try{
            this.$store.dispatch('getParksFromServer').then(response => {
                if(response.data.length > 0){
                    /* this.$store.commit('setSelectedPark', response.data[0])
                    this.$store.commit('setPreSelectedPark', response.data[0]); */
                    this.$store.dispatch('getParkTreesFromServer', this.selectedParkId).then(() =>{
                        this.getUserTreesByPark();
                        this.loading = false;
                    })
                }else{
                    this.loading = false;
                }
            })
        }catch(e){
            this.loading = false;
        }
        
    },
    getUserTreesByPark(){
        let parkTrees = this.parkTrees;
        let userTrees = this.discoveredTrees;
        if(this.isSpecificPark){
            let found = false;
            for(let parkTree of parkTrees){
                for(let userTree of userTrees){
                    if(parkTree.id == userTree.id){
                        this.userDiscoveredTreesByPark.push(parkTree);
                        found = true;
                        break;
                    }
                }
                    if(!found){
                        this.userRemainingTreesByPark += 1;
                    }
                    found = false;
            }
        }

    }
  }

}
</script>
