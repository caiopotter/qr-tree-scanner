import Api from '../../api/Api'
import ParkApi from '../../api/ParkApi'

const state= {
    parks: [],
    selectedPark: {},
    selectedParkTrees: {},
    preSelectedPark: {},
}

const getters= {
    parks(state){
        return state.parks;
    },
    selectedPark(state){
        return state.selectedPark;
    },
    selectedParkTrees(state){
        return state.selectedParkTrees;
    },
    preSelectedPark(state){
        return state.preSelectedPark;
    },
}

const mutations= {
    setSelectedPark(state, payload){
        state.selectedPark = payload;
    },
    setParks(state, payload){
        state.parks = payload.parks;
    },
    setSelectedParkTrees(state, payload){
        state.selectedParkTrees = payload.trees;
    },
    setPreSelectedPark(state, payload){
        state.preSelectedPark = payload;
    }
}

const actions= {
  async getParksFromServer(context){
    try{
        Api.isWaitingResponse(context, true);

        const storedParks = await ParkApi.getParks();
        context.commit('setParks', {
            parks: storedParks.data
        });

        Api.isWaitingResponse(context, false);

        return storedParks;

        }catch(error){
            console.log(error);
            return error
        }
  },
  async getParkTreesFromServer(context, parkId){
    try{
        Api.isWaitingResponse(context, true);

        const storedParkTrees = await ParkApi.getParkTrees(parkId);
        context.commit('setSelectedParkTrees', {
            trees: storedParkTrees.data
        });

        Api.isWaitingResponse(context, false);

        return storedParkTrees;

        }catch(error){
            console.log(error);
            return error
        }
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
