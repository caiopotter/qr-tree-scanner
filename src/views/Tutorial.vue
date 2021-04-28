<template>
  <v-container>
    <h3>Como utilizar o sistema</h3>
    
    <v-btn class="mt-2 mb-2" block rounded @click="collectionExpand = !collectionExpand">
      Coleção
      <v-spacer></v-spacer>
      <v-icon v-if="!collectionExpand" color="green">mdi-chevron-down</v-icon>
      <v-icon v-else color="green">mdi-chevron-up</v-icon>
    </v-btn>
    <v-expand-transition mode="out-in">
      <v-card v-if="collectionExpand" outlined class="mb-2 mt-2">
        <v-card-text class="text-justify">É a tela principal do sistema. Nela, você encontra todas as árvores referentes ao parque selecionado, bem como a indicação de quantas árvores você já encontrou.</v-card-text>
        <v-card-text class="text-justify">Você também pode acessar as informações detalhadas de qualquer árvore que já tenha encontrado.</v-card-text>
      </v-card>
    </v-expand-transition>

    <v-btn class="mb-2" block rounded @click="detailsExpand = !detailsExpand">
      Detalhes
      <v-spacer></v-spacer>
      <v-icon v-if="!detailsExpand" color="green">mdi-chevron-down</v-icon>
      <v-icon v-else color="green">mdi-chevron-up</v-icon>
    </v-btn>
    <v-expand-transition mode="out-in">
      <v-card v-if="detailsExpand" outlined class="mb-2">
        <v-card-text class="text-justify">Aqui estão contidas as principais informações de cada árvore. Características como nome vulgar, nome científico, origem e etc. podem ser encontradas.</v-card-text>
        <v-card-text class="text-justify">Usuários cadastrados também podem deixar comentários na página, para outros usuários lerem.</v-card-text>
      </v-card>
    </v-expand-transition>

    <v-btn class="mb-2" block rounded @click="parksExpand = !parksExpand">
      Parques
      <v-spacer></v-spacer>
      <v-icon v-if="!parksExpand" color="green">mdi-chevron-down</v-icon>
      <v-icon v-else color="green">mdi-chevron-up</v-icon>
    </v-btn>
    <v-expand-transition mode="out-in">
      <v-card v-if="parksExpand" outlined class="mb-2">
        <v-card-text class="text-justify">Tela de seleção de parques. Cada parque possui árvores específicas e em lugares específicos. Com múltiplos parques, os usuários podem utilizar a aplicação em diferentes localidades.</v-card-text>
        <v-card-text class="text-justify">A seleção de parques é liberada ao usuário uma vez que ele descubra um número determinado de árvores no parque principal. Esse número pode ser consultado na própria aba de parques.</v-card-text>
        <v-card-text class="text-justify">Essa tela é um esboço que representa a escalabilidade do sistema. O foco desse trabalho é o bosque do CEFET-RJ, e como consequência, os outros parques dessa tela são exemplos e não refletem a realidade.</v-card-text>
      </v-card>
    </v-expand-transition>

    <v-btn class="mb-2" block rounded @click="scannerExpand = !scannerExpand">
      Leitor de código
      <v-spacer></v-spacer>
      <v-icon v-if="!scannerExpand" color="green">mdi-chevron-down</v-icon>
      <v-icon v-else color="green">mdi-chevron-up</v-icon>
    </v-btn>
    <v-expand-transition mode="out-in">
      <v-card v-if="scannerExpand" outlined class="mb-2">
        <v-card-text class="text-justify">Abre a câmera do smartphone para que o usuário leia o QR Code (código de barras em matriz) posicionado perto da árvore. Cada árvore cadastrada no sistema possui seu próprio QR Code.</v-card-text>
        <v-card-text class="text-justify">Ao realizar uma leitura bem sucedida, o sistema redireciona o usuário para a tela de detalhes da árvore correspondente, bem como registra a árvore como descoberta.</v-card-text>
      </v-card>
    </v-expand-transition>

    <v-btn class="mb-2" block rounded @click="mapExpand = !mapExpand">
      Mapa
      <v-spacer></v-spacer>
      <v-icon v-if="!mapExpand" color="green">mdi-chevron-down</v-icon>
      <v-icon v-else color="green">mdi-chevron-up</v-icon>
    </v-btn>
    <v-expand-transition mode="out-in">
      <v-card v-if="mapExpand" outlined class="mb-2">
        <v-card-text class="text-justify">Mapa do parque selecionado. Mostra a localização das árvores registradas na aplicação. Também especifica se uma árvore foi descoberta pelo usuário.</v-card-text>
        <v-card-text class="text-justify">Pelo mapa, o usuário consegue acessar os detalhes de todas as árvores do parque, mesmo que não a tenha descoberto.</v-card-text>
      </v-card>
    </v-expand-transition>

  </v-container>
</template>
<script>

export default {
  name: 'Tutorial',
  data: () => ({
      collectionExpand: false,
      detailsExpand: false,
      parksExpand: false,
      scannerExpand: false,
      mapExpand: false,
  }),
}
</script>

