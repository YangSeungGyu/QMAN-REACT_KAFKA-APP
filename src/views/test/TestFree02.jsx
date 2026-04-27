function TestFree02() {


  const testFn = function(){
    const test =  localStorage.getItem('test');
    alert(test);
  }

  return(
    <>
       <button onClick={testFn}>확인</button>  
    </>
  );
}
export default TestFree02