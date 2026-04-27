import { useEffect, useState } from "react";


function Memo02() {
   const [text, setText] = useState("");

  useEffect(() => {
    fetch("/memo/REACT_설치.txt")
      .then(res => res.text())
      .then(data => setText(data));
  }, []);


  return(
      <pre>{text}</pre>
  );
}
export default Memo02