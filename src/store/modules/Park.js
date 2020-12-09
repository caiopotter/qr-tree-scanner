import Api from '../../api/Api'
import ParkApi from '../../api/ParkApi'

const state= {
    parks: [],
    selectedPark: {},
}

const getters= {
    parks(state){
        return state.parks;
    },
    selectedPark(state){
        return state.selectedPark;
    }
}

const mutations= {
    setSelectedPark(state, payload){
        state.selectedPark = payload;
    },
    setParks(state, payload){
        state.parks = payload.parks;
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
}

export default {
  state,
  getters,
  mutations,
  actions
}
