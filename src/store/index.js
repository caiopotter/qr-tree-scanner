import Vue from 'vue'
import Vuex from 'vuex'
import Auth from '@/store/modules/Auth'
import User from '@/store/modules/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginDialog: false,
    loading: false,
    video: '',
    menuTitle: undefined,
    trees: [
    {
      discovered: false,
      img: require('@/assets/plantas/milhoDoCato.jpeg'),
      code: 'milho',
      details:
        {
          name: 'Milho do Cato',
          scientificName: 'Zea mays everta',
          family: 'Poaceae',
        },
      text: 'A mais antiga espiga de milho (Zea mays) de que se tem notícia é datada de pelo menos 7.000 a.C. e foi encontrada por arqueólogos no Vale do Tehuacán, localizado no centro do México, e na Guatemala. Uma gramínea chamada teosinto deu origem ao milho que conhecemos hoje, por meio de um processo de seleção e domesticação feitos pelo homem. Antes disso, os grãos ficavam expostos fora da casca. Durante séculos, o milho foi a base da subsistência de povos pré-colombianos como maias, astecas, incas e olmecas. O próprio nome do cereal, originalmente, significa “o sustento da vida”, motivo pelo qual ele era reverenciado pelos ameríndios em rituais artísticos e religiosos. Em 1493, quando Cristóvão Colombo retornou à Europa após a chegada à América, levou consigo diferentes variedades de sementes. No fim do século XVI, o milho já estava espalhado por todos os continentes e adaptado a diversos ambientes e climas. Hoje, é um dos cereais mais cultivados do planeta, com plantações em áreas que vão desde o nível do mar até 3 mil metros de altitude. No Brasil, já era plantado pelos indígenas antes da chegada dos portugueses. Mas, após a colonização, o consumo aumentou muito – os escravos africanos, por exemplo, tinham no milho e na mandioca a base de sua dieta. '
    },
    {
      discovered: false,
      img: require('@/assets/plantas/plantaDaMesinha.jpeg'),
      code: 'mesinha',
      details: 
        {
          name: 'Planta da mesinha',
          scientificName: 'Nephrolepis exaltata',
          family: 'Lomariopsidaceae',
        }
    },
    {
      discovered: false,
      img: require('@/assets/plantas/plantaSemiMortaDaAne.jpeg'),
      code: 'semi-viva',
      details: 
        {
          name: 'Planta semi-viva da Ane',
          scientificName: 'Ane semivivi plantae',
        }
    }
    ]
  },
  mutations: {
    setTreeDiscovered(state, payload){
      state.trees[payload].discovered = true;
    },
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
  },
  getters: {
    storedTrees(state){
      return state.trees
    },
    menuTitle(state){
      return state.menuTitle
    }
  }
})
