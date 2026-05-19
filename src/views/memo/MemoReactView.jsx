import { useEffect, useState } from "react";
import { comm } from '@/js/comm.js';


function MemoReactView({memoId}) {
  const [text, setText] = useState("");
  const memoPath = "/memo/react/";
  let memoFileNm = null;

  if(memoId == '01'){
    memoFileNm = memoPath+"YSG_VS_CODE.txt";
  }else if(memoId == '02'){
    memoFileNm = memoPath+"REACT_설치.txt";
  }else if(memoId == '03'){
    memoFileNm = memoPath+"REACT_구조.txt";
  }else if(memoId == '04'){
    memoFileNm = memoPath+"REACT_사용.txt";
  }else if(memoId == '05'){
    memoFileNm = memoPath+"REACT_기타.txt";
  }else if(memoId == '06'){
    memoFileNm = memoPath+"REDUX-SAGA.txt";  
  }else if(memoId == '07'){
    memoFileNm = memoPath+"반도체_공장용어.txt";    
  } else {
    //에러
    comm.customAlert('파일이 존재하지 않습니다.')
  }

  useEffect(() => {
    fetch(memoFileNm)
      .then(res => res.text())
      .then(data => setText(data));
  }, [memoFileNm]);


  return(
      <pre>{text}</pre>
  );
}
export default MemoReactView