import { useState } from "react";

function TestFree02() {
  
 const [test,setTest] = useState('');
   const testFn = function(){
   }

  return(
    <>
      <input
            type="text"
            onChange={(e) => setTest(e.target.value)}
            value={test}
          />
        <button onClick={testFn}>확인</button>   
    </>
  );
}
export default TestFree02