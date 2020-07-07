<template>
  <v-container class="auto-fill">
      <qrcode-stream :camera="camera" @decode="onDecode">
      <div v-if="validationSuccess" class="validation-success">
        This is a URL
      </div>

      <div v-if="validationFailure" class="validation-failure">
        This is NOT a URL!
      </div>

      <div v-if="validationPending" class="validation-pending">
        Long validation in progress...
      </div>
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
    isValid: undefined
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
      this.turnCameraOn()
    },
    async checkCodeDatabase(result){
      this.$store.dispatch('getQRCodeTree', result).then(response => {
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
        this.$router.push('/colecao/detalhes')
      });
    },
    resetValidationState () {
      this.isValid = undefined
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