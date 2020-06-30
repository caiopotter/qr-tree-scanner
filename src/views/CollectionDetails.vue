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
                        <v-col class="mb-n4" cols="12">
                            <span style="font-weight:bold;">Nome científico: {{selectedTree.scientific_name}}</span>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <span style="font-weight:bold;">Características: {{selectedTree.feature}}</span>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <span style="font-weight:bold;">Origem: {{selectedTree.origin}}</span>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <span style="font-weight:bold;">Tipo da madeira: {{selectedTree.wood_type}}</span>
                        </v-col>
                        <v-col class="mb-n4" cols="12">
                            <span style="font-weight:bold;">Utilidade: {{selectedTree.utility}}</span>
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
</template>

<script>

export default {
  name: 'CollectionDetails',
  components: {
  },
  data: () => ({
      expandTreeText: false,
      treeTextLengthLimit: 150,
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
      
    }

}
</script>
