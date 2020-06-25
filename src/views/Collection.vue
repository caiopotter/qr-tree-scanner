<template>
  <v-container>
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
  }),

  computed: {
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
    details(tree){
        let trees = this.$store.getters.storedTrees
        let treeId = undefined;
        trees.forEach((element, index) => {
            if(element.details.name == tree.details.name){
                treeId = (index+1);
                this.$store.commit('setMenuTitle', tree.details.name)
            }
        });
        this.$router.push('/colecao/' + treeId)
    }
  }

}
</script>
