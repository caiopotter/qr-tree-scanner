<template>
    <v-container>
        <v-row>
            <v-card @click="test" outlined :style="park.id == selectedPark.id ? 'border: 1px solid green' : 'border: 1px solid lightgray' "> 
                <v-row no-gutters>
                    <v-col cols="11">
                <v-card-title>{{park.name}}</v-card-title>
                    </v-col>
                <v-card-subtitle>{{park.address}}</v-card-subtitle>
                </v-row>
                <v-btn @click="testButton" style="position:absolute; right:3%; top:9%" icon>
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
    }),

    computed: {
    },

    methods: {
        test(event){
            console.log(event)
        },
        testButton(){
            console.log('button')
        }
    }
}
</script>

<style>

</style>