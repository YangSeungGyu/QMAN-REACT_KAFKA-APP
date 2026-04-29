import { comm } from '@/js/comm.js';

function TestFree02() {
  
 
  const testFn = async function(){
   await comm.customConfirm('123',()=>alert(1));
   await comm.customConfirm('222',()=>alert(2));
   console.log(11);
  }

  return(
    <>
       <button onClick={testFn}>확인</button>  
    </>
  );
}
export default TestFree02