<template>
  <v-container>
    <v-row class="text-center"   
      align="center"
      justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/pequenaFlorestaSemFundo.png')"
          class="mb-n5 mt-n5"
          contain
          height="300"
        />  
      </v-col>

      <v-col 
      cols="12"
      class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          Boas vindas ao nome do sistema aqui!
        </h1>

        <p class="subheading font-weight-regular">
          Qualquer texto introdutório aqui. Falar sobre o software ou sobre o trabalho, talvez.
        </p>
      </v-col>

      <v-col
        class="mb-5"
        lg="4"
        md="6"
        sm="9"
        xs="12"
      >
        <div>
          <span>Já possui cadastro? Faça o Login!</span>
        </div>
        <div class="mt-3">
          <v-text-field
              v-model="emailValue"
              label="Email"
              outlined
            ></v-text-field>
        </div>
        <div>
          <v-text-field
              v-model="passwordValue"
              label="Senha"
              outlined
            ></v-text-field>
        </div>
     
        <div>
          <v-btn color="electric"
          @click="validateFields">Entrar
          </v-btn>
        </div>
        <div class="mt-3">
          <v-row>
            <v-col xs="1">
              <v-divider></v-divider>
            </v-col>
            <span>ou</span>
            <v-col xs="1">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-btn @click="loginDialog = true" color="light">Cadastre-se</v-btn>
          <v-dialog v-model="loginDialog" max-width="500px">
            <SignUpForm/>
          </v-dialog>
        </div>
         <div class="mt-3">
          <v-dialog v-model="forgotPasswordDialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <a v-on="on">
                Esqueceu sua senha?
              </a>
            </template>
            <ForgotPasswordForm/>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUpForm from '@/components/SignUpForm.vue';
import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'

  export default {
    name: 'SignIn',
    components:{
      SignUpForm,
      ForgotPasswordForm
    },

    data: () => ({
      passwordValue: '',
      emailValue: '',
      loginDialog: false,
      forgotPasswordDialog: false,
    }),
    methods: {
      validateFields(){
        this.$router.push('/scan')
      }
    }
  }
</script>