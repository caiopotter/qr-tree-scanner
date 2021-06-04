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
    },
    getTreeComments(treeId){
      return axios.get('/api/tree/comments', {
        params: {
          treeId: treeId
        }
      })
    },
    getTreeShortFeatures(treeId){
      return axios.get('/api/tree/short-features', {
        params: {
          treeId: treeId
        }
      })
    },
    addTreeComment(treeData){
      return axios.post('/api/tree/comment', treeData)
    },
    getTreePictures(treeId){
      return axios.get('/api/tree-pictures', {
        params: {
          treeId: treeId
        }
      });
    },
    getTreesCoverPictures(){
      return axios.get('/api/trees-cover-pictures');
    }
  }