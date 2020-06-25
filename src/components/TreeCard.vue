<template>
    <v-row>
        <v-col>
            <v-card
      class="mx-auto"
      max-width="344"
    >
                <v-img v-if="!tree.discovered"
                    :src="require('@/assets/pequenaFlorestaCinzaSemFundoIcone.png')"
                    height="200px"
                ></v-img>
                <v-img v-else
                    :src="tree.img"
                    height="200px"
                ></v-img>
            
                <v-card-title>
                    Árvore número {{treeNumber}}
                </v-card-title>
            
                <v-card-subtitle v-if="!tree.discovered">
                    Árvore ainda não descoberta
                </v-card-subtitle>
                <v-card-subtitle v-else>
                    {{tree.details.name}}
                </v-card-subtitle>
            
                <v-card-actions>
                    <v-col cols="12" class="mt-n8 text-right">
                        <v-btn :disabled="!tree.discovered" text @click="getDetails">Detalhes</v-btn>
                    </v-col>
                </v-card-actions>
        
            
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "TreeCard",
    props:['treeNumber', 'tree'],
    data: () => ({
    }),

    computed: {
    },

    methods: {
        getDetails(){
            this.$emit('details', this.tree)
        }
    }
}
</script>

<style>

</style>