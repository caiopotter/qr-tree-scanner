import Vue from 'vue'
import Api from '../../api/Api'
import TreeApi from '../../api/TreeApi'
import store from '..'

const state= {
    storedTrees: [],
    scannedTree: {},
    treePictures: [],
    treesCoverPictures: []
}

const getters= {
    storedTrees(state){
        return state.storedTrees;
    },
    scannedTree(state){
        return state.scannedTree;
    },
    treePictures(state){
        return state.treePictures;
    },
    treesCoverPictures(state){
        return state.treesCoverPictures;
    }
}

const mutations= {
    setstoredTrees(state, payload){
        state.storedTrees = payload.trees;
    },
    setScannedTree(state, payload){
        state.scannedTree = payload;
    },
    setTreePictures(state, payload){
        state.treePictures = payload.pictures
    },
    setTreesCoverPictures(state, payload){
        state.treesCoverPictures = payload.pictures
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
            Api.isWaitingResponse(context, false);
            console.log(error);
            return {error: true, log: error}
        }
  },
  async addTreeComment(context, payload){
    try{
        Api.isWaitingResponse(context, true);

        const response = await TreeApi.addTreeComment(payload);

        Api.isWaitingResponse(context, false);

        return response;

        }catch(error){
            console.log(error);
            return error
        }
  },
  async getTreeComments(context, payload){
    try{
        Api.isWaitingResponse(context, true);

        const treeComments = await TreeApi.getTreeComments(payload);

        Api.isWaitingResponse(context, false);

        return treeComments;

        }catch(error){
            console.log(error);
            return error
        }
  },
  async getTreeShortFeatures(context, payload){
    try{
        Api.isWaitingResponse(context, true);

        const treeShortFeatures = await TreeApi.getTreeShortFeatures(payload);

        Api.isWaitingResponse(context, false);

        return treeShortFeatures;

        }catch(error){
            console.log(error);
            return error
        }
  },
  async getTreePictures(context, payload){
    try{
        Api.isWaitingResponse(context, true);

        const treePictures = await TreeApi.getTreePictures(payload);
        context.commit('setTreePictures', {
            pictures: treePictures.data
        });

        Api.isWaitingResponse(context, false);

        return treePictures;

        }catch(error){
            console.log(error);
            return error
        }
  },
  async getTreesCoverPictures(context){
    try{
        Api.isWaitingResponse(context, true);

        const treesCoverPictures = await TreeApi.getTreesCoverPictures();
        context.commit('setTreesCoverPictures', {
            pictures: treesCoverPictures.data
        });

        Api.isWaitingResponse(context, false);

        return treesCoverPictures;

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
