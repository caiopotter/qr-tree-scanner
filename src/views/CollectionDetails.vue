<template>
    <v-card flat>
        <v-card-actions>
            <v-card flat>
                <v-img v-if="selectedTree.img" :src="selectedTree.img"></v-img>
                <v-img v-else :src="require('../assets/PequenaFlorestaSemTextoSemFundo.png')"></v-img>
                <v-card-actions>
                    <v-row>
                        <v-col class="mb-n4" cols="12">
                            <span style="font-weight:bold;">Nome popular: {{selectedTree.common_name}}</span>
                        </v-col>
                        <v-col class="mb-n2" cols="12">
                            <span style="font-weight:bold;">Nome científico: {{selectedTree.scientific_name}}</span>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <v-btn class="mb-1" block rounded @click="featuresExpand = !featuresExpand">
                                Características
                                <v-spacer></v-spacer>
                                <v-icon v-if="!featuresExpand" color="green">mdi-chevron-down</v-icon>
                                <v-icon v-else color="green">mdi-chevron-up</v-icon>
                            </v-btn>
                            <v-expand-transition mode="out-in">
                                <span style="font-size:0.9em" v-if="featuresExpand">{{selectedTree.feature}}</span>
                            </v-expand-transition>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <v-btn class="mb-1" block rounded @click="originExpand = !originExpand">
                                Origem
                                <v-spacer></v-spacer>
                                <v-icon v-if="!originExpand" color="green">mdi-chevron-down</v-icon>
                                <v-icon v-else color="green">mdi-chevron-up</v-icon>
                            </v-btn>
                            <v-expand-transition mode="out-in">
                                <span style="font-size:0.9em" v-if="originExpand">{{selectedTree.origin}}</span>
                            </v-expand-transition>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <v-btn class="mb-1" block rounded @click="woodTypeExpand = !woodTypeExpand">
                                Tipo de madeira
                                <v-spacer></v-spacer>
                                <v-icon v-if="!woodTypeExpand" color="green">mdi-chevron-down</v-icon>
                                <v-icon v-else color="green">mdi-chevron-up</v-icon>
                            </v-btn>
                            <v-expand-transition mode="out-in">
                                <span style="font-size:0.9em" v-if="woodTypeExpand">{{selectedTree.wood_type}}</span>
                            </v-expand-transition>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <v-btn class="mb-1" block rounded @click="utilityExpand = !utilityExpand">
                                Utilidade
                                <v-spacer></v-spacer>
                                <v-icon v-if="!utilityExpand" color="green">mdi-chevron-down</v-icon>
                                <v-icon v-else color="green">mdi-chevron-up</v-icon>
                            </v-btn>
                            <v-expand-transition mode="out-in">
                                <span style="font-size:0.9em" v-if="utilityExpand">{{selectedTree.utility}}</span>
                            </v-expand-transition>
                        </v-col>  
                        <v-col class="mt-3">
                            <comments :selectedTree="selectedTree"></comments>
                        </v-col>                      
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-card-actions>
    </v-card>
</template>

<script>
import Comments from '@/components/Comments';

export default {
  name: 'CollectionDetails',
  components: {
      Comments
  },
  data: () => ({
      expandTreeText: false,
      treeTextLengthLimit: 150,
      featuresExpand: false,
      originExpand: false,
      woodTypeExpand: false,
      utilityExpand: false,
  }),

  computed: {
      selectedTree(){
        return this.$store.getters.scannedTree;
      },
      adjustTextArea(){
          if(!this.selectedTree.text){
              return;
          }
          if(this.expandTreeText){
              return this.selectedTree.text
          }else{
              return this.selectedTree.text.slice(0, this.treeTextLengthLimit).trim() + '...';
          }
      },
      storedTrees(){
          return this.$store.getters.storedTrees;
      },
      discoveredTrees(){
          let trees = this.$store.getters.storedTrees;
          let discoveredTrees = 0;
          for(let tree of trees){
              if(tree.discovered){
                  discoveredTrees += 1
              }
          }
          return discoveredTrees;
      },

  },

  methods: {
    translatePropName(propName){
        switch (propName){
          case 'name': return 'Nome';
          case 'scientificName': return 'Nome Científico';
          case 'family': return 'Família';
        }
      },
  },
  mounted(){
      if(this.$store.getters.scannedTree.id == undefined){
          this.$router.push('/colecao')
      }
    }

}
</script>
