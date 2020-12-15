<template>
  <v-container>
        <v-row>
            <v-col cols="12">
                <span style="font-weight: bold; font-size: 1.3em">Clique em um cartão para selecionar um parque da lista:</span>
            </v-col>
            <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3" v-for="(park, index) in storedParks" :key="index">
                <park-card @setPreSelectPark="setPreSelectPark" :park="park"></park-card>
            </v-col>
            <v-col class="mt-6" cols="12">
                <v-card class="align-right" style="background-color:lightgray; position: fixed; width: 100%; left:0%; bottom: 0%;">
                    <v-card-actions>
                        <v-btn :disabled="this.$store.getters.selectedPark.id == preSelectedPark.id" color="forest" style="color:white;">Selecionar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
    </v-container>
</template>

<script>
import ParkCard from '@/components/ParkCard';

export default {
    name: 'ParkList',
    components: {
        ParkCard
    },
    data: () => ({
    }),

    computed: {
        storedParks(){
            return this.$store.getters.parks;
        },
        preSelectedPark(){
            return this.$store.getters.preSelectedPark;
        },
        selectedPark(){
            return this.$store.getters.selectedPark;
        }
    },

    methods: {
        setPreSelectPark(clickedPark){
            this.$store.commit('setPreSelectedPark', clickedPark);
        },

    }

}
</script>
