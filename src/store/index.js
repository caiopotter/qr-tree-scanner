import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/store/modules/Auth'
import User from '@/store/modules/User'
import Tree from '@/store/modules/Tree'
import Comment from '@/store/modules/Comment'
import Park from '@/store/modules/Park'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    menuTitle: undefined,
  },
  mutations: {
    setMenuTitle(state, payload){
      state.menuTitle = payload;
    },
    SET_LOADING_STATE(state, payload){
      state.loading= payload.isloading;
    },
  },
  actions: {
  },
  modules: {
    Auth,
    User,
    Tree,
    Comment,
    Park
  },
  getters: {
    menuTitle(state){
      return state.menuTitle
    },
    loading(state){
      return state.loading;
    }
  }
})
