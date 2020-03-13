<template>
  <v-container>
    <v-row class="text-center"   
      align="center"
      justify="center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/cefetLogo.png')"
          class="my-3"
          contain
          height="200"
        />
        <div>alterar logo</div>
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
          <v-btn dark
          @click="validateFields">Login
          </v-btn>
        </div>
        <div class="mt-3">
          <v-dialog v-model="loginDialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <a v-on="on">
                Cadastro de novo usuário
              </a>
            </template>
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
    name: 'Login',
    components:{
      SignUpForm,
      ForgotPasswordForm
    },

    data: () => ({
      passwordValue: '',
      emailValue: '',
      loginDialog: false,
      forgotPasswordDialog: false,
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
    methods: {
      validateFields(){
        console.log("validar email e senha antes da requisição!")
      }
    }
  }
</script>