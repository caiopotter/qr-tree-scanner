<template>
    <v-container style="text-align: -webkit-center;">
        <v-carousel 
            height="auto"
            light
            class="intro"
            :continuous="false"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            :value="carouselValue"
            @change="syncSlide">
            <v-carousel-item
                v-for="(item, index) in carouselItens"
                :key="index"
            >
                <v-img :src="require(`../assets/intro/${item}`)"></v-img>
            </v-carousel-item>
        </v-carousel>
        <intro-texts :selectedItem="carouselItens[carouselValue]"></intro-texts>
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
import IntroTexts from '../components/IntroTexts.vue';
export default {
    name: 'Intro',
    components: {
      IntroTexts
    },
    data: () => ({
        carouselValue: 0,
        carouselItens: ['intro.png', 'collection.png', 'map.png', 'details.png']
    }),
    methods: {
        syncSlide(e){
            this.carouselValue = e;
        },
        nextSlide(){
            if(this.carouselValue < this.carouselItens.length - 1){
                this.carouselValue = this.carouselValue + 1;
            }else{
                this.$router.push('/colecao')
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
    @media only screen and (min-width: 600px) {
        .intro{
            width:50%;
        }
    }
    @media only screen and (min-width: 1500px) {
        .intro{
            width:30%;
        }
    }
    
    .intro .theme--light.v-btn.v-btn--icon{
        color: var(--v-forest-base)
    }
    .intro div.v-item-group.theme--light{
        margin-top: 20px
    }
</style>