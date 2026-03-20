import React, { createContext, useState } from 'react';
import CustomAlert from 'src/components/Modal/CustomAlert';
import CustomConfirm from 'src/components/Modal/CustomConfirm';
import { useEffect } from 'react';
import { comm } from 'src/context/comm.js';


const CommonContext = createContext(undefined);



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

  //comm 을 기본 alert에서 custom으로 변경시킨다. 렌더링시
  useEffect(() => {
    comm.customAlert = customAlert;
    comm.customConfirm = customConfirm;
   }, []);

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
