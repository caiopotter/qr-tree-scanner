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
                  <v-list-item-subtitle>{{userName}}</v-list-item-subtitle>
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

export default {
  name: 'App',

  components: {
  },
  created(){
    this.$store.dispatch('checkAuthState');
    this.getUserInfoFromServer();
  },
  data: () => ({
    menu: false,
    navDrawerItems: [
        { title: 'Coleção', icon: 'mdi-tree', link: '/colecao' },
        { title: 'Escanear código', icon: 'mdi-qrcode-scan', link: '/scan' },
        { title: 'Mapa', icon: 'mdi-map', link: '/mapa' },
        { title: 'Sobre', icon: 'mdi-account-group', link: '/sobre' },
        { title: 'Ajuda', icon: 'mdi-help-box', link: '/ajuda' },
        { title: 'Sair', icon: 'mdi-logout', link: '/login'},
      ],
  }),
  computed:{
    isCollectionDetailsScreen(){
      return this.$route.path.includes('/colecao/')
    },
    menuTitle(){
      return this.$store.getters.menuTitle;
    },
    isUserLoggedIn(){
      return this.$store.getters.userAuthState;
    },
    userName(){
      if(this.$store.getters.user){
        return this.$store.getters.user.name
      }
      return 'Visitante';
    }

  },
  methods:{
    goTo(item){
      if(item.title == "Sair"){
        this.logout(item);
      }else{
        this.$router.push(item.link)
      }
    },
    logout(item){
      if(this.$store.getters.isVisitor){
        this.$store.commit('setUserIsVisitor', false);
        this.$store.commit('clearUserDiscoveredTrees');
        this.$router.push(item.link);
      }else{
        this.$store.dispatch('logout').then(() => {
          this.$store.commit('clearUserDiscoveredTrees');
          this.$store.commit('SET_LOGGEDIN_USER', {user: null});
          this.$router.push(item.link);
        });
      }

    },
    async getUserInfoFromServer(){
      if(this.isUserLoggedIn){
        await this.$store.dispatch('getUserInfoFromServer').then(response => {
          this.$store.dispatch('getUserDiscoveredTrees');
          this.$store.dispatch('getTreesFromServer');
        });
      }else{
        this.$router.push('/login')
      }
    }
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
