<template>
    <v-container>
        <v-carousel :continuous="false" hide-delimiter-background delimiter-icon="mdi-minus" :value="carouselValue" :show-arrows="false" @change="syncSlide">
            <v-carousel-item
                v-for="(item, index) in carouselItens"
                :key="index"
            >
                <v-img :src="require(`../assets/intro/${item}`)"></v-img>
            </v-carousel-item>
        </v-carousel>
        
        <v-card class="align-right" style="background-color:lightgray; position: fixed; height: 50px; width: 100%; left:0%; bottom: 0%;">
            <v-card-actions style="float: right">
                <v-btn
                    :disabled="carouselValue == 0"
                    @click="previousSlide"
                    color="leaf"
                    >Anterior</v-btn>
                <v-btn
                    style="color:white"
                    @click="nextSlide"
                    color="forest"
                    >{{carouselValue == this.carouselItens.length - 1 ? 'Entendi' : 'Próximo'}}</v-btn>
            </v-card-actions>
        </v-card>
        
       
    </v-container>
</template>

<script>

export default {
    name: 'Intro',
    data: () => ({
        carouselValue: 0,
        carouselItens: ['intro.png', 'map.png', 'details.png', 'collection.png']
    }),
    methods: {
        syncSlide(e){
            this.carouselValue = e;
        },
        nextSlide(){
            if(this.carouselValue < this.carouselItens.length - 1){
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
    .theme--dark.v-btn.v-btn--icon{
        color: var(--v-forest-base)
    }
</style>