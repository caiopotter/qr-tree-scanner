import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import Auth from './packages/auth/Auth.js'


Vue.config.productionTip = false
Vue.use(Auth);

window.moment = require('moment');
window.moment.locale('pt-br');

window.axios = require('axios');
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();

axios.defaults.baseURL = 'http://localhost:8000/';


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
