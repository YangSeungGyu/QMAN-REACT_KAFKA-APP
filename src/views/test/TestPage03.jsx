import { useEffect } from 'react';
import CustomButton from 'src/components/Atom/CustomButton'
import { comm } from 'src/context/comm.js';
import { useNavigate } from 'react-router-dom';

function TestPage03() {
  const navigate = useNavigate();

  //페이지 진입 시 로그인 체크
  
  useEffect(() => {
    comm.initAuthCheck(navigate);
  }, [navigate]);
  
  //버튼 클릭(통신)시 토큰없으면 401로 로그인 체크됨
  const testFn = async () =>{  
     const resultData = await comm.axiosPost('/auth/test01',{});
     if(resultData) comm.customAlert(resultData.test);
  }

  return(
    <div>
       <CustomButton 
          label="테스트" 
          onClickFunc={testFn} 
        />
    </div>
  );
}
export default TestPage03