import React, { createContext, useState, useEffect } from 'react';
import CustomAlert from '@/components/Modal/CustomAlert';
import CustomConfirm from '@/components/Modal/CustomConfirm';
import { comm } from '@/js/comm.js';

const CommonContext = createContext(undefined);

export const CommonProvider = ({ children }) => {

  
  // customAlert / customConfirm 상태값 생성
  const [alert, setAlert] = useState({ show: false, msg: '', onClose: () => {} });
  const [confirm, setConfirm] = useState({ show: false, msg: '', onConfirm: () => {}, onCancel: () => {} });



  //comm.js의 customAlert 재할당 하기 위한 function (아래에서 재할당함)
  const customAlert = (msg) => {
    return new Promise((resolve) => {
      setAlert({
        show: true,
        msg:msg,
        onClose: () => {
          setAlert(prev => ({ ...prev, show: false }));
          setTimeout(() => resolve(), 100);
        },
      });
    });
  };

  
  //comm.js의 customAlert를 재할당 하기 위한 function (아래에서 재할당함)
  const customConfirm = (msg, onConfirm) => {
    return new Promise((resolve) => {
      setConfirm({
        show: true,
        msg:msg,
        //onConfirm: onConfirm,
        onConfirm: async () => {
          try{
            setConfirm(prev => ({ ...prev, show: false }));
            setTimeout(() => resolve(true), 100);
            await onConfirm(); // onConfirm 내부에서 api같은걸 호출시 대기
          }catch(error){
            console.error("customConfirm error:", error);
          }finally {
            //끝나면 자동으로 닫힘
            //setConfirm(prev => ({ ...prev, show: false }));
            //setTimeout(() => resolve(true), 100);
          }
        },
        onCancel: () => {
          setConfirm(prev => ({ ...prev, show: false }));
          setTimeout(() => resolve(), 100);
        },
      });
    });
  };

  // ============= 공통데이터 호출 =============
  const [commonData, setCommonData] = useState(null);

  useEffect(() => {
    // comm을 기본 alert에서 custom으로 교체
    comm.customAlert   = customAlert;  //!!중요
    comm.customConfirm = customConfirm;  //!!중요

    // 공통데이터 호출
    const fetchCommon = async () => {
      try {
        //const data = await comm.axiosPost('/common/getCommonData', {}); - 일단 막았음
        const data = {};
        setCommonData(data);
      } catch (e) {
        console.error('공통데이터 로딩 실패:', e);
      }
    };
    fetchCommon();
  }, []);

  return (
    <CommonContext.Provider value={{ customAlert, customConfirm, commonData }}>
      {children} {/* App.jsx에서 CommonProvider 안에 선언된것들 */}

      {/* 공통적으로 사용할 컴포넌트 선언 */}
      <CustomAlert isOpen={alert.show} message={alert.msg} onConfirm={alert.onClose} />
      <CustomConfirm
        isOpen={confirm.show}
        message={confirm.msg}
        //onConfirm={() => { confirm.onConfirm(); setConfirm({ ...confirm, show: false }); }}
        //onCancel={() => setConfirm({ ...confirm, show: false })}
        onConfirm={confirm.onConfirm}
        onCancel={confirm.onCancel}
      />

    </CommonContext.Provider>
  );
};

export default CommonContext;
