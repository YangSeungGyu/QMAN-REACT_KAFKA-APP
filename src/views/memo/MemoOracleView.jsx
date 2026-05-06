import { useEffect, useState } from "react";
import { comm } from '@/js/comm.js';


function MemoOracleView({memoId}) {
  const [text, setText] = useState("");
  const memoPath = "/memo/oracle/";
  let memoFileNm = null;

  if(memoId == '01'){
    memoFileNm = memoPath+"/ORACLE_기본.txt";    
  } else if(memoId == '02'){
    memoFileNm = memoPath+"/ORACLE_조인.txt";
  } else if(memoId == '03'){
    memoFileNm = memoPath+"/ORACLE_재귀호출.txt";
  } else if(memoId == '04'){
    memoFileNm = memoPath+"/ORACLE_내장함수.txt";
  } else if(memoId == '05'){
    memoFileNm = memoPath+"/ORACLE_DML.txt";      
  } else if(memoId == '06'){
    memoFileNm = memoPath+"/ORACLE_합산.txt";      
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
export default MemoOracleView