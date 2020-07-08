import Axios from "axios"

export default{
    deleteUserComment(commentId){
        return axios.delete('/api/tree/comment/' + commentId);
    }
  }