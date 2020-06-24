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
                    {{tree.name}}
                </v-card-subtitle>
            
                <v-card-actions>
                    <v-btn text>Detalhes</v-btn>
                </v-card-actions>
        
            
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:['treeNumber', 'tree'],
    data: () => ({
    }),

    computed: {
    },

    methods: {
    }
}
</script>

<style>

</style>