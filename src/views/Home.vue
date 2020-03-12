<template>
  <v-container>
    <div class="home">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <div>
      <v-dialog v-model="loginDialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" dark class="mb-3">
            <v-icon>mdi-account-multiple-plus-outline</v-icon> Cadastro
          </v-btn>
        </template>
        <SignUpForm :result="result"/>
      </v-dialog>
      <span>Result: {{result}}</span>
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


    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import VueCamera from '@/components/VueCamera.vue'
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SignUpForm,
    VueCamera,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  data: () => ({
    loginDialog: false,
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
  
  mounted(){
    var video = this.$store.state.video;
    console.log('aqui')
    console.log(video)
    const qrScanner = new qr(video);
    qrScanner.start();
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
