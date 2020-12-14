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
            <v-card @click="preSelectPark" outlined :style="park.id == selectedPark.id ? 'border: 1px solid green' : 'border: 1px solid lightgray' "> 
                <v-row no-gutters>
                    <v-col cols="11">
                <v-card-title style="font-size:1.1em">{{park.name}}</v-card-title>
                    </v-col>
                <v-card-subtitle>{{park.address}}</v-card-subtitle>
                </v-row>
                <v-btn @click="showAboutParkDialog" style="position:absolute; right:3%; top:9%" icon>
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
    props:['park', 'selectedPark'],
    data: () => ({
        aboutParkDialog: false
    }),

    computed: {
    },

    methods: {
        preSelectPark(){
            this.$emit('preSelectPark', this.park);
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