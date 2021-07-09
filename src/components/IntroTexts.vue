<template>
    <v-container class="mb-4">
        <v-card v-if="selectedItem == 'intro.png'" flat>
            <v-card-title>Olá!</v-card-title>
            <v-card-text class="text-justify">Essa introdução ajudará você a dar os primeiros passos na Pequena Floresta!</v-card-text>
            <v-card-text class="text-justify">A aplicação foi projetada para ser utilizada no bosque do CEFET-RJ. <b>Ainda que a aplicação funcione no computador, ela foi otimizada para aparelhos celulares.</b></v-card-text>
        </v-card>
        <v-card v-if="selectedItem == 'map.png'" flat>
            <v-card-title>Mapa</v-card-title>
            <v-card-text class="text-justify">Na tela <b>Mapa</b>, você encontrará a localização das árvores mapeadas no bosque.</v-card-text>
            <v-card-text class="text-justify">Você também poderá clicar em uma árvore no mapa para ler seus detalhes. Basta clicar no botão <b>Explorar</b>.</v-card-text>
        </v-card>
        <v-card v-if="selectedItem == 'details.png'" flat>
            <v-card-title>Detalhes</v-card-title>
            <v-card-text class="text-justify">A tela <b>Detalhes</b>, exibe fotos e informações detalhadas da árvore selecionada. Também é possível deixar comentários para que outros usuários leiam.</v-card-text>
        </v-card>
        <v-card v-if="selectedItem == 'collection.png'" flat>
            <v-card-title>Coleção</v-card-title>
            <v-card-text class="text-justify">O catálogo das árvores mapeadas fica na tela <b>Coleção</b>. Nele é possível visualizar as árvores já exploradas e também o número de árvores restantes.</v-card-text>
            <v-card-text class="text-justify">Nas árvores exploradas, haverá um botão <b>+ Detalhes</b> que levará você para a tela de <b>Detalhes</b>.</v-card-text>
            <v-card-text class="text-justify">Atualmente, a forma de explorar uma nova árvore é através da tela <b>Mapa</b>.</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'IntroTexts',
    props: ['selectedItem'],
}
</script>
