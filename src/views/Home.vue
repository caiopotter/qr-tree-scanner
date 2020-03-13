<template>
  <v-container>
    <div class="home">
      <Login/>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

export default {
  name: 'Home',
  components: {
    Login,
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
    }
  },

  methods: {
    onDecode(result){
      this.result = result
    },
        resetValidationState () {
      this.isValid = undefined
    },
  }

}
</script>
