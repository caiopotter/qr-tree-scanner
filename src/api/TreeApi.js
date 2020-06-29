export default{
    registerTree(treeData){
      return axios.post('/api/tree', treeData);
    },
    getTrees(){
      return axios.get('/api/trees');
    },
  }