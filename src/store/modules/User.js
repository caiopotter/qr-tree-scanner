import Vue from 'vue'
import Api from '../../api/Api'
import UserApi from '../../api/UserApi'

const state= {
  user: null,
  gettingUserInfo: false
}

const getters= {
  user(state){
    if(state.user != null && state.user != undefined){
      return state.user;
    }
  },

  userInfoStatus(state){
    return state.gettingUserInfo;
  }
}

const mutations= {
  SET_LOGGEDIN_USER(state, payload){
    state.user= payload.user;
  },

  GETTING_USER_INFO(state, payload){
    state.gettingUserInfo= payload.gettingUserInfo;
  }
}

const actions= {
  async getUserInfoFromServer(context){
    Api.gettingUserInfo(context, true);

    if(context.rootGetters.userAuthState){
      try{
        Api.isWaitingResponse(context, true);

        const loggedInUser= await UserApi.getLoggedUserFromServer();
        context.commit('SET_LOGGEDIN_USER', {
          user: loggedInUser.data
        });

        Api.gettingUserInfo(context, false);
        Api.isWaitingResponse(context, false);

      }catch(error){
        Api.displayRequestError(context, "Informações do usuário não encontradas.");
        Api.gettingUserInfo(context, false);
        context.dispatch('logout', null, { root: true });
        console.log(error);
      }
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
