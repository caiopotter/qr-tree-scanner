<template>
  <v-container>
    <v-card flat>
        <v-card-title>
          Sobre o App
        </v-card-title>
        <v-card-text style="font-weight: bold">
          Você sabia que o bosque do CEFET-RJ é um jardim centenário e que era parte do jardim da família real portuguesa? 
          O bosque possui grande valor histórico e informativo, e foi tombado em 2004.
          O que significa que ele é um patrimônio registrado e protegido por lei contra destruição/descaracterização.
        </v-card-text>
        <v-card-text style="font-weight: bold">
          O bosque possui flora variada, com espécies nativas e exóticas, tendo até mesmo exemplares raros no Brasil.
          Acreditamos que as árvores presentes no bosque contam com diversas informações interessantes e até mesmo valiosas.
          Porém, essas informações não estão sendo repassadas à comunidade que frequenta o espaço cotidianamente.
        </v-card-text>
        <v-card-text style="font-weight: bold">
          O Objetivo deste aplicativo é centralizar as informações contidas no jardim, proporcionando um lugar de troca de conhecimento biológico e geografico entre os usuários e frequentadores do espaço.
        </v-card-text>
    </v-card>

    <v-card class="mt-2" outlined>
        <v-card-title>
          Sobre Nós
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="4" sm="3" md="2" lg="1">
              <v-avatar size="64px" style="border: 2px solid #1E392A">
                <v-img :src="require('../assets/idealizadores/myrna.jpg')"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="mt-5" cols="7">
              <span style="font-weight: bold; font-size:1.4em">Myrna Santos</span>
            </v-col>
            <v-col class="" cols="12">
              <span style="font-weight: bold;">Orientadora do projeto</span><br>
              <span style="font-weight: bold;">Email: <a href="mailto:myrnasantos@gmail.com">myrnasantos@gmail.com</a></span><br>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text class="">
          <v-row>
            <v-col cols="4" sm="3" md="2" lg="1">
              <v-avatar size="64px" style="border: 2px solid #1E392A">
                <v-img :src="require('../assets/idealizadores/jorge.jpg')"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="mt-5" cols="7">
              <span style="font-weight: bold; font-size:1.4em">Jorge Lemos</span>
            </v-col>
            <v-col class="" cols="12">
              <span style="font-weight: bold;">Orientador do projeto</span><br>
              <span style="font-weight: bold;">Email: <a href="mailto:jlemosbio@hotmail.com">jlemosbio@hotmail.com</a></span><br>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="4" sm="3" md="2" lg="1">
              <v-avatar size="64px" style="border: 2px solid #1E392A">
                <v-img :src="require('../assets/idealizadores/caio.jpg')"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="mt-5" cols="7">
              <span style="font-weight: bold; font-size:1.4em">Caio Potter</span>
            </v-col>
            <v-col class="" cols="12">
              <span style="font-weight: bold;">Graduando em Ciência da Computação - CEFET-RJ</span><br>
              <span style="font-weight: bold;">Email: <a href="mailto:limapotter@gmail.com">limapotter@gmail.com</a></span><br>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="4" sm="3" md="2" lg="1">
              <v-avatar size="64px" style="border: 2px solid #1E392A">
                <v-img :src="require('../assets/idealizadores/paulo.jpg')"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="mt-5" cols="7">
              <span style="font-weight: bold; font-size:1.4em">Paulo Correia</span>
            </v-col>
            <v-col class="" cols="12">
              <span style="font-weight: bold;">Graduando em Ciência da Computação - CEFET-RJ</span><br>
              <span style="font-weight: bold;">Email: <a href="mailto:paulovictor_src@hotmail.com">paulovictor_src@hotmail.com</a></span><br>
            </v-col>
          </v-row>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>