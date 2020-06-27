import Vue from 'vue'

import Api from '../../api/Api'
import UserApi from '../../api/UserApi'

const state = {
  isUserLoggedIn: false
}

const getters= {
  userAuthState(state){
    return state.isUserLoggedIn
  }
}

const mutations = {
    SET_USER_AUTH_STATE(state, payload){
    state.isUserLoggedIn= payload.isUserLoggedIn;
  }
}

const actions = {
  checkAuthState(context, payload){
    if(Vue.auth.isAuthenticated()){
      context.commit('SET_USER_AUTH_STATE', {
        isUserLoggedIn: true
      });
    }else{
      context.commit('SET_USER_AUTH_STATE', {
        isUserLoggedIn: false
      });
    }
  },

  async signin(context, payload){
    try{
      Api.isWaitingResponse(context, true);
      const signinResponse= await UserApi.signin(payload);
      Vue.auth.setToken(signinResponse.data.access_token, signinResponse.data.expires_in);

      Api.addDefaultRequestHeader('Authorization', 'Bearer ' + Vue.auth.getToken());
      context.commit('SET_USER_AUTH_STATE', { isUserLoggedIn: true });
      await context.dispatch('getUserInfoFromServer', null, { root: true });

      Api.isWaitingResponse(context, false);

      return signinResponse;
    }catch(error){
      if(error.response.status == 403){
        Api.displayRequestError(context, error.response.data.msg);
      }else{
        Api.displayRequestError(context, "Não foi possível entrar com os dados passados");
      }
      console.log(error);
    }
  },

  async logout(context){
    try{
      Api.isWaitingResponse(context, true);

      Vue.auth.destroyToken();
      const logoutResponse= await UserApi.logout();
      context.commit('SET_USER_AUTH_STATE', { isUserLoggedIn: false });

      Api.isWaitingResponse(context, false);

      return logoutResponse;
    }catch(error){
      Api.displayRequestError(context, "Não foi possível fazer logout no servidor");
      console.log(error);
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
