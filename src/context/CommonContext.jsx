import React, { createContext, useState, useEffect } from 'react';
import CustomAlert from 'src/components/Modal/CustomAlert';
import CustomConfirm from 'src/components/Modal/CustomConfirm';
import { comm } from 'src/context/comm.js';

const CommonContext = createContext(undefined);

export const CommonProvider = ({ children }) => {

  // ============= customAlert / customConfirm =============
  const [alert, setAlert] = useState({ show: false, msg: '', onClose: () => {} });
  const [confirm, setConfirm] = useState({ show: false, msg: '', onConfirm: () => {} });

  const customAlert = (msg) => {
    return new Promise((resolve) => {
      setAlert({
        show: true,
        msg,
        onClose: () => {
          setAlert(prev => ({ ...prev, show: false }));
          setTimeout(() => resolve(), 100);
        },
      });
    });
  };

  const customConfirm = (msg, onConfirm) => setConfirm({ show: true, msg, onConfirm });

  // ============= 공통데이터 호출 =============
  const [commonData, setCommonData] = useState(null);

  useEffect(() => {
    // comm을 기본 alert에서 custom으로 교체
    comm.customAlert   = customAlert;
    comm.customConfirm = customConfirm;

    // 공통데이터 호출
    const fetchCommon = async () => {
      try {
        const data = await comm.axiosPost('/common/getCommonData', {});
        setCommonData(data);
      } catch (e) {
        console.error('공통데이터 로딩 실패:', e);
      }
    };
    fetchCommon();
  }, []);

  return (
    <CommonContext.Provider value={{ customAlert, customConfirm, commonData }}>
      {children}
      <CustomAlert isOpen={alert.show} message={alert.msg} onConfirm={alert.onClose} />
      <CustomConfirm
        isOpen={confirm.show}
        message={confirm.msg}
        onConfirm={() => { confirm.onConfirm(); setConfirm({ ...confirm, show: false }); }}
        onCancel={() => setConfirm({ ...confirm, show: false })}
      />
    </CommonContext.Provider>
  );
};

export default CommonContext;
