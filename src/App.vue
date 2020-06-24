<template>
  <v-app >
    <v-navigation-drawer
    v-model="menu"
    app
    clipped
    color="electric">
      <v-list 
          dense
          nav
        >
          <v-list-item two-line>
                <v-list-item-avatar size="50px">
                  <v-img :src="require('./assets/PequenaFlorestaSemTextoSemFundo.png')"
                  contain
                  />
                </v-list-item-avatar>
    
                <v-list-item-content>
                  <v-list-item-title>Pequena Floresta</v-list-item-title>
                  <v-list-item-subtitle>Catálogo</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
  
            <v-divider class="mb-2"></v-divider>
          <v-list-item
            v-for="item in navDrawerItems"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title @click="goTo(item.link)">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="!$route.path.includes('login')"
      app
      color="forest"
    >
      <div class="align-center">
        <v-btn @click="menu=true" icon color="white"><v-icon>mdi-menu</v-icon></v-btn>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Login from './components/Login';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    menu: false,
    navDrawerItems: [
        { title: 'Escanear código', icon: 'mdi-qrcode-scan', link: '/scan' },
        { title: 'Coleção', icon: 'mdi-tree', link: '/colecao' },
        { title: 'Mapa', icon: 'mdi-map', link: '/mapa' },
        { title: 'Sobre', icon: 'mdi-help-box', link: '/sobre' },
        { title: 'Sair', icon: 'mdi-logout', link: '/login'},
      ],
  }),
  methods:{
    goTo(link){
      this.$router.push(link)
    }
  },
};
</script>
