import { useState } from "react";

function TestFree01() {

  let test01 = '';

  

  const testFn = function(){
   alert(test01);
    
  }
  

  
  return(
    <>
      <input
            type="text"
            onChange={(e) => testFn(e.target.value)}
            value={test01}
          />
        <button onClick={testFn}>확인</button>   
    </>
  );
}
export default TestFree01