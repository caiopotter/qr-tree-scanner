<template>
    <v-card flat>
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
</template>

<script>
import TreeCard from '@/components/TreeCard';

export default {
  name: 'CollectionDetails',
  components: {
    TreeCard
  },
  data: () => ({
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
      let trees = this.$store.getters.storedTrees;
      trees.forEach((element, index) => {
          if((index + 1) == this.$route.params.id){
              this.selectedTree = element;
          }
      });
    }

}
</script>
