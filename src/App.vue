<template>
  <v-app >
    <v-navigation-drawer
    v-model="menu"
    app
    color="light">
      <v-list 
          dense
          nav
        >
          <v-list-item two-line>
                <v-list-item-avatar size="50px">
                  <v-img :src="require('./assets/PequenaFlorestaSemTexto.png')"
                  contain
                  />
                </v-list-item-avatar>
    
                <v-list-item-content>
                  <v-list-item-title>Pequena Floresta</v-list-item-title>
                  <v-list-item-subtitle>Menu</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
  
            <v-divider class="mb-2"></v-divider>
          <v-list-item
            v-for="item in navDrawerItems"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon v-if="$route.path.includes(item.link)" style="color:green">{{ item.icon }}</v-icon>
              <v-icon v-else>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title v-if="$route.path.includes(item.link)" style="color:green" nav @click="goTo(item)">{{ item.title }}</v-list-item-title>
              <v-list-item-title v-else nav @click="goTo(item)">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar v-if="!$route.path.includes('login')"
      app
      color="forest"
    >
      <div v-if="!isCollectionDetailsScreen" class="align-center">
        <v-btn @click="menu=!menu" icon color="white">
          <v-icon v-if="!menu">mdi-menu</v-icon>
          <v-icon v-else>mdi-arrow-collapse-left</v-icon>
          </v-btn>
      </div>
      <v-row no-gutters v-else>
          <v-col cols="10">
            <span style="color:white; font-size:1.2em">{{menuTitle}}</span>
          </v-col>
          <v-col class="text-rigth ml-3">
            <v-icon @click="$router.push('/colecao')" class="left-absolute-align" style="color:white">mdi-close</v-icon>
          </v-col>
        </v-row>

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
  computed:{
    isCollectionDetailsScreen(){
      return this.$route.path.includes('/colecao/')
    },
    menuTitle(){
      return this.$store.getters.menuTitle;
    }
  },
  methods:{
    goTo(item){
      if(item.title == "Sair"){
        this.$store.dispatch('logout').then(() => {
          this.$router.push(item.link);
        });
      }else{
        this.$router.push(item.link)
      }
    },
  },
};
</script>
<style>
  .left-absolute-align{
    position: absolute !important;
    right: 5%;
    top:30%;
  }
</style>
