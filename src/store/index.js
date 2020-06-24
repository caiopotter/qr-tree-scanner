import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginDialog: false,
    video: '',
    trees: [
    {
      discovered: false,
      img: require('@/assets/plantas/milhoDoCato.jpeg'),
      name: 'Milho do Cato',
      code: 'milho'
    },
    {
      discovered: false,
      img: require('@/assets/plantas/plantaDaMesinha.jpeg'),
      name: 'Planta da mesinha',
      code: 'mesinha'
    },
    {
      discovered: false,
      img: require('@/assets/plantas/plantaSemiMortaDaAne.jpeg'),
      name: 'Planta semi-viva da Ane',
      code: 'semi-viva'
    }
    ]
  },
  mutations: {
    setTreeDiscovered(state, payload){
      console.log(state, payload)
      state.trees[payload].discovered = true;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    treesDiscovered(state){
      return state.trees
    }
  }
})
