export default{

    addDefaultRequestHeader(type, header){
      axios.defaults.headers.common[type] = header;
    },
  
    isWaitingResponse(context, status){
      context.commit('SET_LOADING_STATE', {
        isloading: status
      }, { root: true });
    },
  
    gettingUserInfo(context, status){
      context.commit('GETTING_USER_INFO',{
        gettingUserInfo: status
      });
    },
  }
  