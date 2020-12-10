export default{
    getParks(){
      return axios.get('/api/park');
    },
    getParkTrees(parkId){
      return axios.get(`/api/park/trees/${parkId}`)
    },
  }