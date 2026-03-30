import { store } from "src/store/index";
import axios from 'axios';


//전역변수 함수모음

//comm.customAlert,comm.customConfirm 두개는 CommonContext.jsx 에서 렌더링시 재할당됨
export let comm = {
  /* .ts 에서 사용하기위한 기본 값 선언. - .ts쪽이라(스크립트가 메모리에 먼저올라감) CommonProvider(리엑트 렌더링되면서 실행됨) 준비가 안되었을경우 기본 alert와 confirm을 리턴하는 로직*/
 customAlert: (msg) => {
    alert(msg);
    return Promise.resolve();
  }, 
  customConfirm: (msg, onConfirm) => { if(confirm(msg)) onConfirm(); }
  ,API_URL : "http://localhost:8199"
  ,getTodayString : null
  ,formatDate : null
  ,initAuthCheck : null
  ,axiosPost : null
  ,axiosPostForm : null
};


//=================================================[02.기타 전역변수]=================================================

export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};
comm.getTodayString = getTodayString;

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};
comm.formatDate = formatDate;


//=================================================[03.로그인 인증 관련]=================================================
//페이지 진입시 로그인 체크
export const initAuthCheck = async (navigate) => {
  // [수정] useSelector 대신 store.getState() 사용
  const state = store.getState();
  const isLoggedIn = state.auth.isLoggedIn; 

  if (!isLoggedIn) {
    await comm.customAlert('로그인이 필요한 페이지입니다.');
    
    if (navigate) {
      navigate('/login'); 
    } else {
      window.location.href = '/login';
    }
    return false;
  }
  return true;
};
comm.initAuthCheck = initAuthCheck;


//로그인 토큰을 포함한 axios통신
export const axiosPost = async (url, data = {}) => {
  // [변경] Redux 스토어에서 토큰 추출
  const state = store.getState();
  const token = state.auth.user?.accessToken; 
  
  const fullUrl = comm.API_URL + url;
  try {
    const response = await axios.post(fullUrl, data, {
      headers: { 
        'Authorization': token ? `Bearer ${token}` : '', // 토큰이 있을 때만 포함
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      return response.data; 
    } else {
      console.log('axiosPost err :' + response.status);
      return null;
    }
  } catch (err) {
   if (err.response && err.response.data && err.response.data.message) {
      comm.customAlert(err.response.data.message);
    } else {
      comm.customAlert("통신 중 오류가 발생했습니다.");
    }
    return null;
  }
};
comm.axiosPost = axiosPost;


export const axiosPostForm = async (url, formData = {}) => {
  console.log(formData);
  const response = await axios.post(comm.API_URL + url, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data;
};
comm.axiosPostForm = axiosPostForm;