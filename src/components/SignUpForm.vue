<template>
    <v-card>
          <v-card-title class="mt-n1" :style="{'background-color': 'var(--v-' + 'forest' + '-base)'}">
            <span style="color:white">
                Novo usuário
            </span>
            <v-spacer></v-spacer>
            <v-icon @click="closeSignUpForm" style="color:white">mdi-close</v-icon>
          </v-card-title>
        <v-card-text class="mt-4">
            por favor, preencha os dados abaixo para acessar o sistema:
        </v-card-text>
        <v-row class="text-center"   
      align="center"
      justify="center">

      <v-col
        class="ma-5"
        lg="10"
        md="10"
        sm="10"
        xs="12"
      >
      <v-form v-model="isValidForm">
        <div class="mt-3">
          <v-text-field
              dense rounded
              color="green"
              v-model="nameValue"
              label="Nome"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
        </div>
        <div>
          <v-text-field
              dense rounded
              color="green"
              v-model="emailValue"
              label="Email"
              :rules="[rules.required, rules.email]"
              outlined
            ></v-text-field>
        </div>
        <div>
          <v-text-field
              dense rounded
              color="green"
              v-model="passwordValue"
              label="Senha"
              outlined
              :rules="[rules.required, rules.min]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              prepend-inner-icon="mdi-key"
            ></v-text-field>
        </div>
        <div>
          <v-text-field
              dense rounded
              color="green"
              v-model="confirmPasswordValue"
              label="Confirmar Senha"
              outlined
              :rules="[rules.required, rules.min, passwordConfirmationRule]"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmPassword ? 'text' : 'password'"
              @click:append="showConfirmPassword = !showConfirmPassword"
              prepend-inner-icon="mdi-key"
            ></v-text-field>
        </div>
     
        <div>
          <v-btn v-if="!operationSucceeded" :loading='loading' :disabled="!isValidForm" color="forest" class="white--text"
          @click="validateFields">Cadastro
          </v-btn>
          <v-btn color="forest" class="white--text" v-else>
            <v-icon color="white">mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
        </div>
        <div class="mt-1">
          <span :style="{'font-weight': 'bold', 'font-size': '0.9em'}">{{statusMessage}}</span>
        </div>
      </v-form>
      </v-col>
    </v-row>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        emailValue: '',
        nameValue: '',
        passwordValue: '',
        confirmPasswordValue: '',
        showPassword: false,
        showConfirmPassword: false,
        isValidForm: false,
        statusMessage: '',
        loading: false,
        operationSucceeded: false,
        rules: {
            required: value => !!value || 'Campo obrigatório.',
            min: v => v.length >= 4 || 'Ao menos 4 caracteres',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'E-mail inválido'
            },
        }
    }),
    computed:{
      passwordConfirmationRule() {
        return this.passwordValue === this.confirmPasswordValue || 'Senhas não coincidem'
      },
    },
    methods:{
        async validateFields(){
          if(this.isValidForm){
            this.loading = true;
            this.$store.dispatch('signup', 
            {
              email: this.emailValue, 
              name: this.nameValue, 
              password: this.passwordValue, 
              password_confirmation: this.confirmPasswordValue
            }).then(response => this.reportResultToUser(response))
          }
        },
        closeSignUpForm(){
          this.$emit('closeDialog')
        },
        reportResultToUser(response){
          if(response.status == 201){
            this.loading = false;
            this.operationSucceeded = true;
            this.statusMessage = 'Redirecionando para o Login'
            setTimeout(()=>{
              this.clearSignUpForm()
              this.closeSignUpForm()
            },2000);
          }
        },
        clearSignUpForm(){
          this.emailValue = '';
          this.nameValue = '';
          this.passwordValue = '';
          this.confirmPasswordValue = '';
          this.statusMessage = '';
          this.operationSucceeded = false;
        }
    }
}
</script>