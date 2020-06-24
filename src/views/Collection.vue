<template>
  <v-container>
      <v-row>
          <v-col cols="12" v-for="(tree, index) in storedTrees" :key="index">
            <tree-card :treeNumber="index+1" :tree="tree"></tree-card>
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
          return this.$store.getters.treesDiscovered;
      }
  },

  methods: {
  }

}
</script>
