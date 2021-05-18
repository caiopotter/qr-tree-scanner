<template>
  <v-container class="auto-fill">
    <v-dialog v-model="limitedFeatureDialog" max-width="500px">
      <v-card style="overflow: hidden">
        <v-card-title class="mt-n1" :style="{'background-color': 'var(--v-' + 'forest' + '-base)'}">
          <span style="color:white; font-size:0.9em">
              Leitor de QR Code
          </span>
          <v-spacer></v-spacer>
          <v-icon @click="limitedFeatureDialog = false" style="color:white">mdi-close</v-icon>
        </v-card-title>
        <v-card-actions>
          <v-row class="text-center">
            <v-col cols="12">
              <span style="color:grey; font-size:0.9em">O leitor de QR Code foi criado para ler os códigos de barras instalados perto das árvores, em cada parque. 
                Por conta da COVID-19, todas as árvores estão disponíveis para consulta no mapa.</span>
            </v-col>
            <v-col cols="6">
              <v-btn outlined color="forest" style="color:white"
                @click="limitedFeatureDialog = false">Continuar
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn color="forest" style="color:white"
                @click="$router.go(-1)">Retornar
              </v-btn>
            </v-col>
          </v-row>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
      <qrcode-stream :camera="camera" @decode="onDecode">
      <v-snackbar
        v-model="invalidCode"
        :timeout="timeout"
        color="forest"
      >
      Código não encontrado
      </v-snackbar>
    </qrcode-stream>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

export default {
  name: 'Scanner',
  components: {
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data: () => ({
    result: '',
    camera: 'auto',
    isValid: undefined,
    invalidCode: false,
    timeout: 5000,
    limitedFeatureDialog: false,
  }),

  mounted(){
    this.showLimitedFeatureDialog();
  },

  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    },
    trees(){
      return this.$store.getters.storedTrees;
    },
    userDiscoveredTrees(){
      return this.$store.getters.userTrees;
    }
  },

  methods: {
    showLimitedFeatureDialog(){
      this.limitedFeatureDialog = true;
    },
    onDecode(result){
      this.turnCameraOff()
      this.result = result
      this.isValid = this.checkCodeDatabase(result)
      this.resetValidationState()
      this.turnCameraOn()
    },
    async checkCodeDatabase(result){
      this.$store.dispatch('getQRCodeTree', result).then(response => {
        if(response.error) {
          this.invalidCode = true;
          return false;
        }
        let isQRCodeRepeated = false;
        for(let discoveredTree of this.userDiscoveredTrees){
          if(discoveredTree.id == response.data.id){
            isQRCodeRepeated = true;
            break;
          }
        }
        if(!isQRCodeRepeated){
          if(!this.$store.getters.isVisitor){
            this.$store.dispatch('setTreeDiscovered', response.data.id);
          }
          this.$store.commit('addTreeToUserDiscoveredTreesArray', response.data)
        }
        this.$store.commit('setScannedTree', response.data);
        this.$store.commit('setMenuTitle', response.data.common_name);
        this.turnCameraOff()
        this.$router.push('/colecao/detalhes')
      });
    },
    resetValidationState () {
      this.isValid = undefined
      this.result = ''
    },
    turnCameraOn () {
      this.camera = 'auto'
    },
    turnCameraOff () {
      this.camera = 'off'
    },
  }

}
</script>
<style>
    .auto-fill{
        width: auto;
        overflow: hidden;
        padding: 0px !important;
        margin:-12px;
        height: 100vh;
        position: fixed;
    }
</style>