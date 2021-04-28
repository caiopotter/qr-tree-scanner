<template>
    <v-container>
        <v-dialog fullscreen v-model="aboutParkDialog" max-width="500px">
            <v-card>
                <v-card-title :style="{'background-color': 'var(--v-' + 'forest' + '-base)'}">
                    <span style="font-size:0.8em; color:white">
                        {{park.name}}
                    </span>
                    <v-spacer></v-spacer>
                    <v-icon @click="closeAboutParkDialog" style="color:white">mdi-close</v-icon>    
                </v-card-title>
                <v-card-subtitle class="mt-2"><span style="font-weight:bold">Endereço: </span>{{park.address}}</v-card-subtitle>
                <v-card-text style="font-weight:bold">Sobre o parque:</v-card-text>
                <v-card-text>{{park.about}}</v-card-text>
            </v-card>    
        </v-dialog>
        <v-row>
            <v-card :disabled="disabled" @click="setPreSelectPark" outlined :style="[park.id == preSelectedPark.id ? {'border': '1px solid green'} : {'border': '1px solid lightgray'}, {'width':'100%'}]"> 
                <v-row no-gutters>
                    <v-col cols="11">
                <v-card-title style="font-size:1.1em">{{park.name}}</v-card-title>
                    </v-col>
                <v-card-subtitle>{{park.address}}</v-card-subtitle>
                </v-row>
                <v-btn v-if="hasHelp" @click="showAboutParkDialog" style="position:absolute; right:3%; top:9%" icon>
                    <v-icon color="forest">mdi-help-circle</v-icon>
                </v-btn>
                <v-card-text v-if="selectedPark.id == park.id" style="position:absolute; bottom:0%; right:3%; padding:0px; text-align:right">selecionado</v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "ParkCard",
    props:['park', 'hasHelp', 'disabled'],
    data: () => ({
        aboutParkDialog: false
    }),

    computed:{
        preSelectedPark(){
            return this.$store.getters.preSelectedPark;
        },
        selectedPark(){
            return this.$store.getters.selectedPark;
        }
    },

    methods: {
        setPreSelectPark(){
            this.$emit('setPreSelectPark', this.park);
        },
        showAboutParkDialog(){
            this.aboutParkDialog = true;
        },
        closeAboutParkDialog(){
            this.aboutParkDialog = false;
        }
    }
}
</script>

<style>

</style>