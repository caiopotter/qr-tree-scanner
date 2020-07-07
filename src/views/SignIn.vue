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
          <span style="font-weight: bold; font-size:0.9em">Já possui cadastro? Faça o Login!</span>
        </div>
        <div class="mt-3">
          <v-text-field
              color="green"
              v-model="emailValue"
              label="Email"
              outlined
              prepend-inner-icon="mdi-account"
            ></v-text-field>
        </div>
        <div>
          <v-text-field
              color="green"
              v-model="passwordValue"
              label="Senha"
              outlined
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              prepend-inner-icon="mdi-key"
            ></v-text-field>
        </div>
        <span style="color:red; font-weight: bold; font-size:0.9em">{{errorMessage}}</span>
        <div>
          <v-btn style="color:var(--v-forest-base)" color="leaf"
          @click="loginAttempt" :loading="loading">Entrar
          </v-btn>
        </div>
        <div class="mt-3">
          <v-row>
            <v-col xs="1">
              <v-divider></v-divider>
            </v-col>
            <span style="font-weight: bold; font-size:0.8em">não possui conta?</span>
            <v-col xs="1">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-btn small text class="mt-2" @click="loginDialog = true" color="tin">Cadastre-se</v-btn>
          <v-dialog fullscreen v-model="loginDialog" max-width="500px">
            <Sign-Up-Form @closeDialog="loginDialog = false"></Sign-Up-Form>
          </v-dialog>
        </div>
        <div class="mt-3">
          <v-row>
            <v-col xs="1">
              <v-divider></v-divider>
            </v-col>
            <span style="font-weight: bold; font-size:0.8em">ou</span>
            <v-col xs="1">
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-btn text small @click="visitorDialog = true" color="tin">Entre como visitante</v-btn>
          <v-dialog v-model="visitorDialog" max-width="500px">
            <v-card style="overflow: hidden">
              <v-card-title class="mt-n1" :style="{'background-color': 'var(--v-' + 'forest' + '-base)'}">
                <span style="color:white">
                    Visitante
                </span>
                <v-spacer></v-spacer>
                <v-icon @click="visitorDialog = false" style="color:white">mdi-close</v-icon>
              </v-card-title>
              <v-card-actions>
                <v-row class="text-center">
                  <v-col cols="12">
                    <span style="color:grey; font-size:0.9em">Deseja entrar na plataforma como visitante? Dessa forma, nenhuma informação será salva.</span>
                  </v-col>
                  <v-col cols="6">
                    <v-btn color="forest" style="color:white"
                      @click="visitorLoginAttempt" :loading="loading">Entrar
                    </v-btn>
                  </v-col>
                  <v-col cols="6">
                    <v-btn outlined color="forest" style="color:white"
                      @click="visitorDialog = false">Cancelar
                    </v-btn>
                  </v-col>
                </v-row>
                
              </v-card-actions>
            </v-card>
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
      ForgotPasswordForm,
    },

    data: () => ({
      passwordValue: '',
      showPassword: false,
      emailValue: '',
      loginDialog: false,
      forgotPasswordDialog: false,
      errorMessage: '',
      loading: false,
      visitorDialog: false,
    }),
    methods: {
      async loginAttempt(){
        try{
          this.loading = true;
          let result = await this.validateUserData();
          this.$store.dispatch('getTreesFromServer');
          this.$store.dispatch('getUserDiscoveredTrees', this.$store.getters.user.id)
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
      },
      visitorLoginAttempt(){
        this.loading = true;
        this.$store.commit('setUserIsVisitor', true);
        this.$store.dispatch('getTreesFromServer');
        this.loading = false;
        this.$router.push('/colecao');
      },
    },
    beforeCreate(){
      if(this.$store.getters.userAuthState){
        this.$router.push('/colecao')
      }
    }
  }
</script>