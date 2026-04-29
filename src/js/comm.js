import { useAuthStore } from '@/js/auth/useAuthStore';
import axios from 'axios';

//전역변수 초기 선언
/*
  !!!! 중요 : comm.customAlert,comm.customConfirm 두개는 CommonContext.jsx 에서 렌더링시 재할당됨!!!
  jsx에서는 Context할당을 받아 Provider값을 직접 사용 가능하지만  
  js에서는 직접적으로 Context를 할당받아서 호출 할 수 없으므로 js에서 먼저 할당하고 CommonContext가 호출될 때 재할당되어 셋팅되는
  방식을 사용.
*/
export let comm = {
  //초기선언 -> CommonContext에서 덮어씀
  customAlert: (msg) => {
    alert(msg);
    return Promise.resolve();
  },
  //초기선언 -> CommonContext에서 덮어씀
  customConfirm: (msg, onConfirm) => { if (confirm(msg)) onConfirm();  return Promise.resolve();},

  //고정 값이 아닌경우 모두 초기값으로 두고 아래에서 로직 작성 후 할당.
  API_URL       : 'http://localhost:8199',
  getTodayString: null,
  formatDate    : null,
  initAuthCheck : null,
  axiosPost     : null,
  axiosPostForm : null,
};


//=================================================[02.기타 전역변수]=================================================

export const getTodayString = () => {
  const today = new Date();
  const year  = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day   = String(today.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};
comm.getTodayString = getTodayString;

export const formatDate = (date) => {
  const year  = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day   = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
};
comm.formatDate = formatDate;


//=================================================[03.로그인 인증 관련]=================================================

// 페이지 진입시 로그인 체크
export const initAuthCheck = async (navigate) => {
  // zustand store에서 직접 getState()로 접근 (훅 없이)
  const { isLoggedIn } = useAuthStore.getState();

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


// 로그인 토큰을 포함한 axios 통신
export const axiosPost = async (url, data = {}) => {
  // zustand store에서 직접 getState()로 접근 (훅 없이)
  const { user } = useAuthStore.getState();
  const token = user?.accessToken;

  const fullUrl = comm.API_URL + url;
  try {
    const response = await axios.post(fullUrl, data, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.log('axiosPost err :' + response.status);
      return null;
    }
  } catch (err) {
    if (err.response?.data?.message) {
      comm.customAlert(err.response.data.message);
    } else {

      comm.customAlert('통신 중 오류가 발생했습니다.\n('+url+')');
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
