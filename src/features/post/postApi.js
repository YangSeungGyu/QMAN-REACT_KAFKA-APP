import axios from 'axios';

export const fetchPostsAPI = (params) => {


  return axios.get('http://localhost:8199/test/test2',{params: params});
};