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
              color="green"
              v-model="emailValue"
              label="Email"
              outlined
            ></v-text-field>
        </div>
        <div>
          <v-text-field
              color="green"
              v-model="passwordValue"
              label="Senha"
              outlined
            ></v-text-field>
        </div>
        <span>{{errorMessage}}</span>
        <div>
          <v-btn color="electric"
          @click="loginAttempt" :loading="loading">Entrar
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
          <v-dialog fullscreen v-model="loginDialog" max-width="500px">
            <Sign-Up-Form @closeDialog="loginDialog = false"></Sign-Up-Form>
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
      errorMessage: '',
      loading: false
    }),
    methods: {
      async loginAttempt(){
        try{
          this.loading = true;
          let result = await this.validateUserData();
          this.$router.push('/colecao')
        }catch (e){
          if(e == 'Error: Request failed with status code 401'){
            this.errorMessage = 'Usuário ou senha inválidos'
            setTimeout(()=>{
              this.errorMessage = ''
            },5000);
          }
        }finally{
          this.loading = false
        }
      },
      async validateUserData(){
        let userData = {
          'email': this.emailValue,
          'password': this.passwordValue
        }
        let userLoginResult = await this.$store.dispatch('signin', userData);
        return userLoginResult;
      }
    }
  }
</script>