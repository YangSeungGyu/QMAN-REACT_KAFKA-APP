
import { useEffect, useState } from 'react';
import CustomButton from 'src/components/Atom/CustomButton'
import { Client } from '@stomp/stompjs'; // stompjs 추가
import SockJS from 'sockjs-client'; // SockJS 추가
import { comm } from 'src/context/comm.js';


function TestKafka() {
  const [inputText, setInputText] = useState("");
 const [messages, setMessages] = useState([]);


  const sendFn = async () =>{      
   if (!inputText.trim()) {
      alert("보낼 내용을 입력하세요!");
      return;
    }

    // 2. 입력한 텍스트를 JSON 구조에 담아서 전송
    const param = {
      message: inputText,
      timestamp: new Date().toLocaleTimeString() 
    };

    await comm.axiosPost('/kafka/kafkaTestRequest',param);

    setInputText("");
  }


//페이지 진입시 실행
useEffect(() => {
    // 2. 초기 데이터 가져오기
    const fetchInitData = async () => {
      try {
        const response = await comm.axiosPost('/kafka/kafkaTestInitData',{});
        console.log(response);
        if (response.result === 'success') {
          setMessages(response.data); // 서버의 messageStorage 배열을 그대로 셋팅
        }
      } catch (e) {
        console.error("초기 로딩 실패", e);
      }
    };
    fetchInitData();
  

// 3. 웹소켓 연결 및 실시간 데이터 누적
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8199/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe('/topic/kafka-data', (message) => {
          const receivedData = JSON.parse(message.body);
          // 이전 리스트(초기데이터 포함)에 실시간 데이터만 툭 추가
          setMessages((prev) => [...prev, receivedData]);
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, []);


  return(
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendFn()} // 엔터키 지원
          placeholder="보낼 메시지를 입력하세요"
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <CustomButton label="보내기" onClickFunc={sendFn} />
      </div>

   
       <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} style={{ 
              padding: '8px 0', 
              borderBottom: '1px dotted #eee',
              display: 'flex', 
              alignItems: 'baseline', 
              gap: '10px' 
            }}>
              {/* 메시지 본문 */}
              <span style={{ fontWeight: '500', color: '#333' }}>
                {msg.message}
              </span>

              {/* 타임스탬프: 작고 연한 회색 */}
              <span style={{ 
                fontSize: '11px', 
                color: '#999', 
                fontWeight: '300' 
              }}>
                {msg.timestamp}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TestKafka