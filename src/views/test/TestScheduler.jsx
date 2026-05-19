import React from 'react';
import CustomButton from '@/components/Atom/CustomButton';
import { comm } from '@/js/comm.js';
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import ShowCode from '@/components/Common/showCode'; //DeleteShowCodeLine
import sourceCode from './TestScheduler.jsx?raw'; //DeleteShowCodeLine

function TestScheduler() {
  const [statusObj,setStatusObj] = React.useState(null);//스케줄러 목록 및 상태값
  const [logs, setLogs] = React.useState([]);// 스케줄러 로그
  const clientRef = React.useRef(null);//소캣클라이언트

  //스케줄러 목록 및 상태값 받아오기
  React.useEffect(()=>{
    const getStatusObj = async () =>{
       const resultData = await comm.axiosPost('/scheduler/getStatus',{});
       setStatusObj(resultData);
    }
    getStatusObj();

  },[]);

  //로그용 소켓 연결
  React.useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(comm.API_URL+"/ws"),
      onConnect: () => {
        console.log("스케줄러 소켓 연결됨");
        client.subscribe("/topic/schedulerLog", (message) => {
          setLogs(prev => [message.body, ...prev]); // 최신 로그가 위로
        });
      },
      onDisconnect: () => {
        console.log("스케줄러 소켓 끊김");
      }
    });
    client.activate();
    clientRef.client = client;
    return () => {
      client.deactivate();
    };
  }, []);


 //스케줄로 시작/중지
  const changeStatusFn = async function(id,sts){
    const params = {
      schedulId:id
      ,status : sts
    }
    await comm.axiosPost('/scheduler/changeStatus',params);

    setStatusObj(prev => ({
      ...prev,
      [id]: sts  //그냥 id쓰면 "id" 가 되어버림 변수로 쓰려면 []감싸야됨
    }));
  }

  return(
    <>
      <ShowCode sourceCode={sourceCode|| "is not found"}/>{/*DeleteShowCodeLine*/}
      {statusObj === null ? (
        <div>api서버가 연결되지않아 스케줄러 목록 확인이 불가합니다.</div>
      ) : (   
        Object.entries(statusObj).map(([id, status]) => (
          <div key={id}>
            스케줄{id} : 
            <CustomButton 
              label={status == 'N' ? '시작' : '중지'}
              onClickFunc={() => changeStatusFn(id, (status == 'N' ? 'Y':'N'))} 
            />
          </div>
        ))
      )}


      <div style={{
        marginTop: '20px',
        height: '200px',
        overflowY: 'auto',
        background: '#1e1e1e',
        color: '#00ff00',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '13px'
      }}>
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </>
  );
}
export default TestScheduler