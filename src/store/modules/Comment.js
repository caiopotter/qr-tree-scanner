import Vue from 'vue'
import Api from '../../api/Api'
import CommentApi from '../../api/CommentApi'

const state= {
}

const getters= {
}

const mutations= {
}

const actions= {
    async deleteUserComment(context, payload){
        try{
            Api.isWaitingResponse(context, true);
    
            const response = await CommentApi.deleteUserComment(payload);
    
            Api.isWaitingResponse(context, false);
            
            return response;
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
