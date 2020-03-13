<template>
    <v-card>
        <v-card-title>
            Esqueceu a senha?
        </v-card-title>
        <v-card-text>
            por favor, preencha os dados abaixo para recuperar seu acesso:
        </v-card-text>
        <v-row class="text-center"   
      align="center"
      justify="center">

      <v-col
        class="ma-5"
        lg="4"
        md="6"
        sm="9"
        xs="12"
      >
        <div class="mt-3">
          <v-text-field
              v-model="emailValue"
              label="Email"
              outlined
            ></v-text-field>
        </div>
     
        <div>
          <v-btn dark
          @click="validateFields">Enviar Email
          </v-btn>
        </div>
      </v-col>
    </v-row>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        emailValue: '',
    }),
    methods:{
        validateFields(){
            console.log("validar email!")
        }
    }
}
</script>