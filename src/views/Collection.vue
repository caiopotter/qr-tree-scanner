<template>
  <v-container>
        <v-row>
            <v-col cols="12">
                <span style="font-weight: bold; font-size: 1.3em">Sua coleção:</span>
            </v-col>
            <v-col cols="12" class="mt-n6">
                <span style="font-weight: bold; font-size: 0.9em">{{discoveredTrees.length}} de {{storedTrees}} árvores descobertas</span>
            </v-col>
            <v-col class="mb-n6" cols="12" v-for="(tree, index) in discoveredTrees" :key="index">
                <tree-card :treeNumber="index+1" :tree="tree" :discovered="true" @details="details"></tree-card>
            </v-col>
            <v-col class="mb-n6" cols="12" v-if="remainingTreesNumber > 0">
                <tree-card v-for="(n) in remainingTreesNumber" :key="discoveredTrees.length + n -1"
                :treeNumber="discoveredTrees.length + n" :discovered="false"></tree-card>
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
          return this.$store.getters.userTrees;
      },
      remainingTreesNumber(){
          return this.$store.getters.storedTrees - this.$store.getters.userTrees.length;
      }

  },

  methods: {
    details(tree){
        this.$store.commit('setScannedTree', tree)
        this.$store.commit('setMenuTitle', tree.common_name)
        this.$router.push('/colecao/detalhes')
    }
  }

}
</script>
