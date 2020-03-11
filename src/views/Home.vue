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
        <SignUpForm/>
      </v-dialog>

      <VueCamera id="video"></VueCamera>

    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import VueCamera from '@/components/VueCamera.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    SignUpForm,
    VueCamera
  },
  data: () => ({
    loginDialog: false,
  }),
  
  mounted(){
    var video = this.$store.state.video;
    console.log('aqui')
    console.log(video)
    const qrScanner = new qr(video);
    qrScanner.start();
  },

}
</script>
