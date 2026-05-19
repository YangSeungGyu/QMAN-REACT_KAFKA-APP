import { useEffect, useState } from "react";
import { comm } from '@/js/comm.js';


function MemoOtherView({memoId}) {
  const [text, setText] = useState("");
  const memoPath = "/memo/other/";
  let memoFileNm = null;

  if(memoId == '01'){
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
export default MemoOtherView