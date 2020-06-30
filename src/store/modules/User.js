import Vue from 'vue'
import Api from '../../api/Api'
import UserApi from '../../api/UserApi'

const state= {
  user: null,
  userTrees: [],
  gettingUserInfo: false
}

const getters= {
  user(state){
    if(state.user != null && state.user != undefined){
      return state.user;
    }
  },

  userTrees(state){
    return state.userTrees;
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
  },
  setUserDiscoveredTrees(state, payload){
    for(let tree of payload){
      state.userTrees.push(tree);
    }
  },
  addTreeToUserDiscoveredTreesArray(state, payload){
    state.userTrees.push(payload)
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
        Api.gettingUserInfo(context, false);
        context.dispatch('logout', null, { root: true });
        console.log(error);
      }
    }
  },
  async getUserDiscoveredTrees(context){
      try{
        Api.isWaitingResponse(context, true);

        let userId = this.getters.user.id;
        const userTrees = await UserApi.getUserDiscoveredTrees(userId);
        context.commit('setUserDiscoveredTrees', userTrees.data);

        Api.isWaitingResponse(context, false);

      }catch(error){
        console.log(error);
        return error;
      }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
