export default{
    signin(userData){
      return axios.post('/api/auth/login', userData);
    },

    signup(userData){
        return axios.post('/api/auth/signup', userData);
      },
  
    logout(){
      return axios.get('/api/auth/logout');
    },
  
    getLoggedUserFromServer(){
      return axios.get('/api/auth/user');
    },

    getUserDiscoveredTrees(userId){
      return axios.get('/api/user/trees', {
        params: {userId: userId}
      })
    }
  }
  