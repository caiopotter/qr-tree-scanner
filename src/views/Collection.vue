<template>
  <v-container>
        <v-dialog fullscreen v-model="treeDetailDialog">
            <v-card>
                <v-card-title :style="{'background-color': 'var(--v-forest-base)'}">
                    <span style="color:white">
                        {{selectedTree.details? selectedTree.details.name : ''}}
                    </span>
                    <v-spacer></v-spacer>
                    <v-icon @click="clearDetailsDialog" class="mr-1" style="color:white">mdi-close</v-icon>
                </v-card-title>
                <v-card-actions>
                    <v-card flat>
                        <v-img :src="selectedTree.img"></v-img>
                        <v-card-actions>
                            <v-row>
                                <v-col class="mb-n4" v-for="(detail, propName, index) in selectedTree.details" :key="index" cols="12">
                                    <span style="font-weight:bold;">{{translatePropName(propName)}}: {{detail}}</span>
                                </v-col>
                                <v-col v-if="selectedTree.text" cols="12">
                                    <v-card outlined>
                                        <v-card-text>
                                            {{adjustTextArea}}
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                    
                                            <v-btn
                                            icon
                                            @click="expandTreeText = !expandTreeText"
                                            >
                                            <v-icon>{{ expandTreeText ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                    
                        
                    
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col cols="12">
                <span style="font-weight: bold; font-size: 1.3em">Sua coleção:</span>
            </v-col>
            <v-col cols="12" class="mt-n6">
                <span style="font-weight: bold; font-size: 0.9em">{{discoveredTrees}} de {{storedTrees.length}} árvores descobertas</span>
            </v-col>
            <v-col cols="12" v-for="(tree, index) in storedTrees" :key="index">
                <tree-card :treeNumber="index+1" :tree="tree" @details="details"></tree-card>
            </v-col>
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
      treeDetailDialog: false,
      selectedTree: {},
      expandTreeText: false,
      treeTextLengthLimit: 150,
  }),

  computed: {
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
          return this.$store.getters.treesDiscovered;
      },
      discoveredTrees(){
          let trees = this.$store.getters.treesDiscovered;
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
    clearDetailsDialog(){
      this.selectedTree = {}
      this.treeDetailDialog = false
    },
    details(tree){
        this.selectedTree = tree;
        this.treeDetailDialog = true;
    }
  }

}
</script>
