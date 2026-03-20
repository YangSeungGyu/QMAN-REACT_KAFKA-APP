import React, { createContext, useState } from 'react';
import CustomAlert from 'src/components/Modal/CustomAlert';
import CustomConfirm from 'src/components/Modal/CustomConfirm';
import { store } from "src/store/index";
import axios from 'axios'

const CommonContext = createContext(undefined);


//전역변수 함수모음
export let comm = {
  /* .ts 에서 사용하기위한 기본 값 선언. - .ts쪽이라(스크립트가 메모리에 먼저올라감) CommonProvider(리엑트 렌더링되면서 실행됨) 준비가 안되었을경우 기본 alert와 confirm을 리턴하는 로직*/
 customAlert: (msg) => {
    alert(msg);
    return Promise.resolve();
  }, 
  customConfirm: (msg, onConfirm) => { if(confirm(msg)) onConfirm(); }
  ,API_URL : "http://localhost:8099"
  ,getTodayString : null
  ,formatDate : null
  ,initAuthCheck : null
  ,axiosPost : null
  ,axiosPostForm : null
};



//=================================================[01.customAlert, customConfirm]=================================================

/*
alert는 동기처리를 해서 다음 로직을 이어갈 수 있게 만든다.
confirm은 확인 이후 함수를 받으니 직접처리.
*/
export const CommonProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    onClose: () => {},
  });
  const [confirm, setConfirm] = useState({ show: false, msg: '', onConfirm: () => {} });

  const customAlert = (msg) => {
    return new Promise((resolve) => {
      setAlert({
        show: true,
        msg,
        onClose: () => {
          setAlert(prev => ({ ...prev, show: false }));
          setTimeout(() => {
            resolve();
        }, 100);
        },
      });
    });
  };
  const customConfirm = (msg, onConfirm) => setConfirm({ show: true, msg, onConfirm });

  //comm 을 기본 alert에서 custom으로 변경시킨다.
  comm.customAlert = customAlert;
  comm.customConfirm = customConfirm;

  return (
    <CommonContext.Provider value={{ customAlert, customConfirm }}>
      {children}
      <CustomAlert isOpen={alert.show} message={alert.msg} onConfirm={alert.onClose}/>
      <CustomConfirm 
        isOpen={confirm.show} 
        message={confirm.msg} 
        onConfirm={() => { confirm.onConfirm(); setConfirm({ ...confirm, show: false }); }}
        onCancel={() => setConfirm({ ...confirm, show: false })}
      />
    </CommonContext.Provider>
  );
};

/* 
  [선언]
    import { comm } from 'src/context/CommonContext';

  [사용 예시?]
    01.컴포넌트 생성자 - 그냥 실행
    const A = () => {
      seEffect(() => {
        comm.customAlert('1');
      }
    }

    02.컴포넌트 생성자 - 멈추고 확인 후 로직 진행
    const A = () => {
      const init = async () => {
          await comm.customAlert('1'); 
          TO-DO
      };
    init();
    }

    03.함수내부, 혹은 .js에서 사용 - 그냥 실행
    comm.customAlert('1');

    03.함수내부, 혹은 .js에서 사용 - 정지 필요.
    export const testFn = async () => {
      await comm.customAlert('1');
      TO-DO ..포커싱이나..등등..
    }
*/

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