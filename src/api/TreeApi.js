export default{
    registerTree(treeData){
      return axios.post('/api/tree', treeData);
    },
    getTreesNumber(){
      return axios.get('/api/trees-number');
    },
    setUserDiscoveredTree(tree, user){
      return axios.post('/api/tree/user', {userId: user, treeId: tree})
    },
    getQRCodeTree(code){
      return axios.get('/api/code', {
        params: {
          code: code
        }
      });
    }
  }