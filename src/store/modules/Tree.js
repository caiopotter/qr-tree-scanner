import Vue from 'vue'
import Api from '../../api/Api'
import TreeApi from '../../api/TreeApi'

const state= {
    storedTrees: [],
}

const getters= {
    storedTrees(state){
        return state.storedTrees;
    }
}

const mutations= {
    setstoredTrees(state, payload){
        state.storedTrees= payload.trees;
    },
}

const actions= {
  async getTreesFromServer(context){
    try{
        Api.isWaitingResponse(context, true);

        const storedTrees = await TreeApi.getTrees();
        context.commit('setstoredTrees', {
            trees: storedTrees.data
        });

        Api.isWaitingResponse(context, false);

        }catch(error){
            console.log(error);
            return error
        }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
