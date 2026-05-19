import axios from 'axios';
import { comm } from '@/js/comm.js';

export const fetchPostsAPI = (params) => {


  return axios.get(comm.API_URL+'/test/test2',{params: params});
};