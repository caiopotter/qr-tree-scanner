<template>
  <v-container class="auto-fill">
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
  }),

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