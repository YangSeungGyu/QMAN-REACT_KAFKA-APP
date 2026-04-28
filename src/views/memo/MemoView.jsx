import { useEffect, useState } from "react";
import { comm } from '@/js/comm.js';


function MemoView({memoId}) {
  const [text, setText] = useState("");

  let memoFileNm = null;

  if(memoId == '01'){
    memoFileNm = "/memo/YSG_VS_CODE.txt";
  }else if(memoId == '02'){
    memoFileNm = "/memo/REACT_설치.txt";
  }else if(memoId == '03'){
    memoFileNm = "/memo/REACT_구조.txt";
  }else if(memoId == '04'){
    memoFileNm = "/memo/REACT_사용.txt";
  }else if(memoId == '05'){
    memoFileNm = "/memo/REACT_기타.txt";
  }else if(memoId == '06'){
    memoFileNm = "/memo/REDUX-SAGA.txt";  
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
export default MemoView