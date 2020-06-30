<template>
    <v-row>
        <v-col>
            <v-card
      class="mx-auto"
      max-width="344"
    >
                <v-img v-if="!discovered"
                    :src="require('@/assets/pequenaFlorestaCinzaSemFundoIcone.png')"
                    height="200px"
                ></v-img>
                <v-img v-else
                    :src="require('../assets/PequenaFlorestaSemTextoSemFundo.png')"
                    height="200px"
                ></v-img>
            
                <v-card-title v-if="!discovered">
                    Árvore número {{treeNumber}}
                </v-card-title>
                <v-card-title v-else>
                    {{tree.common_name}}
                </v-card-title>
            
                <v-card-subtitle v-if="!discovered">
                    Árvore ainda não descoberta
                </v-card-subtitle>
                <v-card-subtitle v-else>
                    {{tree.scientific_name}}
                </v-card-subtitle>
            
                <v-card-actions>
                    <v-col cols="12" class="mt-n8 text-right">
                        <v-btn :disabled="!discovered" text @click="getDetails">Detalhes</v-btn>
                    </v-col>
                </v-card-actions>
        
            
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "TreeCard",
    props:['treeNumber', 'tree', 'discovered'],
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