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
    }
  },

  methods: {
    onDecode(result){
      this.camera = 'off'
      this.result = result
      this.isValid = this.checkCodeDatabase(result)
      this.turnCameraOn()
    },
    checkCodeDatabase(result){
      let trees = this.trees;
      trees.forEach((element, index) => {
        if(result == element.code){
          this.$store.commit('setTreeDiscovered', index);
          this.$store.commit('setMenuTitle', element.details.name)
          this.$router.push('/colecao/' + (index+1))
        }
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