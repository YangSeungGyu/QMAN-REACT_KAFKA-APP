import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestSoket.jsx?raw'; //DeleteShowCodeLine

function TestSoket() {
  const [msg, setMsg] = useState(''); //soket보낼 메시지
  const [logs, setLogs] = useState([]); //하단에 뿌릴 로그
  const clientRef = useRef(null);//클라이언트 객체유지

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8199/ws"),
      onConnect: () => {
        console.log("소켓 연결됨");
        client.subscribe("/testTopic", (message) => {
          setLogs(prev => [...prev, "Recive : " + message.body]);
        });
      },
      onDisconnect: () => {
        console.log("소켓 끊김");
      }
    });

    client.activate(); //연결
    clientRef.client = client;

    return () => {
      client.deactivate(); // 의존성배열이[] 이므로 return은 언마운트때만 실행됨.
    };
  }, []);

  const soketParam = {
    destination: "/app/test/testSoket",
    body: msg
  }

  const testFn = () => {
    if (clientRef.client && clientRef.client.connected) {
      setLogs(prev => [...prev, "Send : " + msg]); //입력된값 로그에 추가
      clientRef.client.publish(soketParam); //soket으로 메시지 전송
      setMsg('');//송신 메시지 초기화
    } else {
      console.log("소켓 연결 안됨");
    }
  };

  return (
    <>
      <ShowCode sourceCode={sourceCode|| "is not found"} />{/*DeleteShowCodeLine*/}
      <input
        type="text"
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
      />
      <button onClick={testFn}>보내기</button>
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </>
  );
}

export default TestSoket;