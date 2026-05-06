import React from 'react';
import CustomButton from '@/components/Atom/CustomButton';
import ModalLayout from '@/components/Modal/ModalLayout';
import BodyTestSample from '@/components/Modal/BodyTestSample';
import { comm } from '@/js/comm.js';

import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestCustomConfirm.jsx?raw'; //DeleteShowCodeLine

function TestCustomConfirm() {
  

  const test00Fn = async function(){
    await comm.customAlert('123');
    await comm.customAlert('222');
    console.log(11);
  }
 
  const test01Fn = async function(){
    const sub01Fn = function(){console.log(1)};
    await comm.customConfirm('123',sub01Fn);
    await comm.customConfirm('222',sub01Fn);
    console.log(11);
  }

  const test02Fn = async function(){
    const sub02Fn = async function(){
        await comm.customAlert('내부확인01');

        const subInner01Fn = function(){console.log(2)};
        await comm.customConfirm('내부확인02',subInner01Fn);
    };
    await comm.customConfirm('외부확인',sub02Fn);
  }



  //모달
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return(
    <>
      <ShowCode sourceCode={sourceCode|| "is not found"}/>{/*DeleteShowCodeLine*/}
      <div>
        CommonContext.jsx에 선언되어있며 Provider로 App.jsx에 연결(comm.js는 js파일에서도 사용하기 위한 껍데기)
      </div>
      <hr className="line-hr" />{/*============================================ */}  
      <CustomButton 
            label="Alert 순차 2번" 
            onClickFunc={test00Fn} 
        /> 
      <CustomButton 
            label="Confirm 순차 2번" 
            onClickFunc={test01Fn} 
        />
      <CustomButton 
            label="Confirm 확인Fn내부 Alert + Confirm" 
            onClickFunc={test02Fn} 
        />
      <hr className="line-hr" />{/*============================================ */}  
      ModalLayout.jsx은 모달의 전체 틀이고 내용은 BodyTestSample.jsx
      <hr className="line-hr" />{/*============================================ */}  
       <CustomButton 
            label="샘플모달열기" 
            onClickFunc={()=>setIsModalOpen(true)} 
       />
       {/* 열기전엔 안보임 */}
       <ModalLayout 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="테스트모달1"
          modalBody={<BodyTestSample onConfirm={handleConfirm} onCancel={() => setIsModalOpen(false)} />}
       /> 
    </>
  );
}
export default TestCustomConfirm