<template>
  <v-container>
        <v-row v-if="isLoading">
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <span style="font-weight: bold; font-size: 1.3em">Seleção de parques</span>
            </v-col>
            <v-col cols="12">
                <v-card flat v-if="userParksIsDisabled">
                    <v-card-text class="text-justify" style="font-weight: bold; font-size: 0.9em">No momento, somente o Bosque do CEFET-RJ está disponível.</v-card-text>
                    <v-card-text class="text-justify mt-n4" style="font-weight: bold; font-size: 0.9em">Para habilitar a exploração de novos parques, explore um pouco mais o bosque.</v-card-text>
                    <v-card-text class="text-justify mt-n4" style="font-weight: bold; font-size: 0.9em">Você precisa descobrir mais {{numberOfTreesToEnableParks - userTreesNumber}} árvores para habilitar a seleção de parques.</v-card-text>
                </v-card>
                <v-card flat v-else>
                    <v-card-text style="font-weight: bold; font-size: 1.1em">Escolha o parque desejado</v-card-text>
                </v-card>
            </v-col>
           <!--  <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3">
                <park-card @setPreSelectPark="setPreSelectPark" :park="{id:undefined, name:'Sem parque', address:'Visualizar os dados de todos os locais'}" :hasHelp="false"></park-card>
            </v-col> -->
            <v-col class="mb-n6" cols="12" sm="6" md="4" lg="3" v-for="(park, index) in storedParks" :key="index">
                <park-card @setPreSelectPark="setPreSelectPark" :park="park" :hasHelp="true" :disabled="userParksIsDisabled"></park-card>
            </v-col>
            <v-col class="mt-6" cols="12">
                <v-card class="align-right" style="background-color:lightgray; position: fixed; height: 50px; width: 100%; left:0%; bottom: 0%;">
                    <v-card-actions>
                        <v-btn @click="selectNewPark" :disabled="this.$store.getters.selectedPark.id == preSelectedPark.id" color="forest" style="position: absolute; bottom: 10%; right: 5%; color:white;">Selecionar</v-btn>
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
        numberOfTreesToEnableParks: 15,
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
        },
        userTreesNumber(){
            return this.$store.getters.userTrees.length;
        },
        userParksIsDisabled(){
            return this.$store.getters.userTrees.length < this.numberOfTreesToEnableParks;
        },
        isLoading(){
            return this.$store.getters.loading
        }
    },

    methods: {
        setPreSelectPark(clickedPark){
            this.$store.commit('setPreSelectedPark', clickedPark);
        },
        selectNewPark(){
            let newPark = this.preSelectedPark
            this.$store.commit('setSelectedPark', newPark)
            if(newPark.id != undefined){
                this.$store.dispatch('getParkTreesFromServer', newPark.id).then(res => {
                    this.$router.push('/colecao')
                })
            }else{
                this.$router.push('/colecao')
            }
        }

    }

}
</script>
