<template>
    <v-container>
        <v-carousel :continuous="false" :value="carouselValue" hide-delimiters :show-arrows="false" @change="test">
            <v-carousel-item
            v-for="i in slides"
            :key="i"
            >
           <div>{{i}}</div>
            </v-carousel-item>
        </v-carousel>
        
        <v-card class="align-right" style="background-color:lightgray; position: fixed; height: 50px; width: 100%; left:0%; bottom: 0%;">
            <v-card-actions style="float: right">
                <v-btn
                    :disabled="carouselValue == 0"
                    @click="previousSlide"
                    color="success"
                    >Anterior</v-btn>
                <v-btn
                    @click="nextSlide"
                    color="info"
                    >{{carouselValue == this.slides - 1 ? 'Entendi' : 'Próximo'}}</v-btn>
            </v-card-actions>
        </v-card>
        
       
    </v-container>
</template>

<script>
export default {
    name: 'Intro',
    data: () => ({
        carouselValue: 0,
        slides: 5
    }),
    methods: {
        test(e){
            this.carouselValue = e;
        },
        nextSlide(){
            if(this.carouselValue < this.slides - 1){
                this.carouselValue = this.carouselValue + 1;
            }
        },
        previousSlide(){
            if(this.carouselValue > 0){
                this.carouselValue = this.carouselValue - 1;
            }
        }
    }
}
</script>

<style>

</style>