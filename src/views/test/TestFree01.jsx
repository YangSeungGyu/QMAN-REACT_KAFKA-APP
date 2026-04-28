import { useState } from "react";

function TestFree01() {

  const [test,setTest] = useState('');

alert(2);

  const testFn = function(){
    alert(test);
    localStorage.setItem('test', test);
    
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
export default TestFree01