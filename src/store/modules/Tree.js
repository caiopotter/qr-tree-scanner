import Vue from 'vue'
import Api from '../../api/Api'
import TreeApi from '../../api/TreeApi'
import store from '..'

const state= {
    storedTrees: [],
    scannedTree: {},
}

const getters= {
    storedTrees(state){
        return state.storedTrees;
    },
    scannedTree(state){
        return state.scannedTree;
    }
}

const mutations= {
    setstoredTrees(state, payload){
        console.log(payload.trees)
        state.storedTrees= payload.trees;
    },
    setScannedTree(state, payload){
        state.scannedTree = payload;
    }
}

const actions= {
  async getTreesFromServer(context){
    try{
        Api.isWaitingResponse(context, true);

        const storedTrees = await TreeApi.getTreesNumber();
        context.commit('setstoredTrees', {
            trees: storedTrees.data
        });

        Api.isWaitingResponse(context, false);

        }catch(error){
            console.log(error);
            return error
        }
  },
  async setTreeDiscovered(context, payload){
    try{
        Api.isWaitingResponse(context, true);

        let userId = this.getters.user.id

        const scannedTree = await TreeApi.setUserDiscoveredTree(payload, userId);

        Api.isWaitingResponse(context, false);

        return scannedTree;

        }catch(error){
            console.log(error);
            return error
        }
  },
  async getQRCodeTree(context, payload){
    try{
        Api.isWaitingResponse(context, true);

        const scannedTree = await TreeApi.getQRCodeTree(payload);

        Api.isWaitingResponse(context, false);

        return scannedTree;

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
