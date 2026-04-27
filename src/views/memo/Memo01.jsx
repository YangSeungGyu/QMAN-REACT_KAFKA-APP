import { useEffect, useState } from "react";


function Memo01() {
   const [text, setText] = useState("");

  useEffect(() => {
    fetch("/memo/YSG_VS_CODE.txt")
      .then(res => res.text())
      .then(data => setText(data));
  }, []);


  return(
      <pre>{text}</pre>
  );
}
export default Memo01