import React from 'react';
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function TestPcap4j() {
  const [logs, setLogs] = React.useState([]);
  const [copied, setCopied] = React.useState(false);
  const [srcFilter, setSrcFilter] = React.useState('');
  const [dstFilter, setDstFilter] = React.useState('');
  const [dirFilter, setDirFilter] = React.useState('');
  const [showPeers, setShowPeers] = React.useState(false);        // 추가
  const [peers, setPeers] = React.useState([]);                   // 추가 {src, dst} 중복없는 배열
  const clientRef = React.useRef(null);

  const installUrl = "/download/npcap-1.88.exe";

  React.useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8199/ws"),
      onConnect: () => {
        client.subscribe("/packet", (message) => {
          const body = message.body;

          // Source/Destination 추출
          const dirMatch = body.match(/direction: (\[.+?\])/);  // 추가
          const srcMatch = body.match(/Source address: ([^\n]+)/);
          const dstMatch = body.match(/Destination address: ([^\n]+)/);
          const dir = dirMatch ? dirMatch[1].trim() : ''; 
          const src = srcMatch ? srcMatch[1].trim() : null;
          const dst = dstMatch ? dstMatch[1].trim() : null;

          // 중복 없는 peers 배열에 추가
          if (src && dst) {
            setPeers(prev => {
              const exists = prev.some(p => p.src === src && p.dst === dst);
              return exists ? prev : [...prev, { src, dst, dir }];  // dir 추가
            });
          }

          // 필터 체크
          const srcOk = srcFilter === '' || body.includes(`Source address: ${srcFilter}`);
          const dstOk = dstFilter === '' || body.includes(`Destination address: ${dstFilter}`);
          const dirOk = dirFilter === '' || body.includes(`direction: ${dirFilter}`);
          if (!srcOk || !dstOk || !dirOk) return;

          setLogs(prev => {
            const formattedLog = `${body}\n=======================================================================`;
            return [formattedLog, ...prev].slice(0, 100);
          });
        });
      },
      onDisconnect: () => console.log("Pcap4j 소켓 끊김"),
    });

    client.activate();
    clientRef.current = client;
    return () => clientRef.current?.deactivate();
  }, [srcFilter, dstFilter, dirFilter]);

  const handleCopyLogs = async () => {
    if (logs.length === 0) { alert("복사할 로그가 없습니다."); return; }
    const textToCopy = logs.join('\n');
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(textToCopy); triggerCopySuccess(); return; }
      catch (err) { console.warn("clipboard 실패:", err); }
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = textToCopy;
      ta.style.cssText = "position:fixed;left:-9999px;top:-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      triggerCopySuccess();
    } catch (err) { alert("복사 실패"); }
  };

  const triggerCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 상단 타이틀 및 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
        <h3 style={{ margin: 0 }}>실시간 네트워크 패킷 모니터 (최신 100개)</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

          {/* 송수신 대상 보기 버튼 - 추가 */}
          <button
            onClick={() => setShowPeers(p => !p)}
            style={{
              padding: '6px 12px',
              backgroundColor: showPeers ? '#1565c0' : '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {showPeers ? '송수신 대상 닫기' : '송수신 대상 보기'}
          </button>

          <button
            onClick={handleCopyLogs}
            style={{
              padding: '6px 12px',
              backgroundColor: copied ? '#2e7d32' : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              transition: 'background-color 0.2s'
            }}
          >
            {copied ? '복사 완료!' : '전체 로그 복사'}
          </button>

          <a href={installUrl} className="download-button" style={{ textDecoration: 'none' }}>
            npcap-1.88.exe[설치필수]
          </a>
        </div>
      </div>

      {/* 필터 영역 */}
      <div style={{ display: 'flex', gap: '10px', margin: '8px 0', alignItems: 'center' }}>
        <label style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>Source Filter</label>
        <input
          type="text"
          placeholder="ex) 192.168.0.112"
          value={srcFilter}
          onChange={e => setSrcFilter(e.target.value)}
          style={{ padding: '4px 8px', fontFamily: 'monospace', fontSize: '13px', width: '160px' }}
        />
        <label style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>Destination Filter</label>
        <input
          type="text"
          placeholder="ex) 203.133.187.91"
          value={dstFilter}
          onChange={e => setDstFilter(e.target.value)}
          style={{ padding: '4px 8px', fontFamily: 'monospace', fontSize: '13px', width: '160px' }}
        />

        {/* 드롭다운 추가 */}
        <select
          value={dirFilter}
          onChange={e => setDirFilter(e.target.value)}
          style={{ padding: '4px 8px', fontFamily: 'monospace', fontSize: '13px', cursor: 'pointer' }}
        >
          <option value="">전체</option>
          <option value="[받은 패킷]">받은 패킷</option>
          <option value="[보내는 패킷]">보내는 패킷</option>
          <option value="[기타]">기타</option>
        </select>

        <button
          onClick={() => { setSrcFilter(''); setDstFilter(''); setDirFilter(''); }} // dirFilter 초기화 추가
          style={{ padding: '4px 10px', fontSize: '13px', cursor: 'pointer' }}
        >
          초기화
        </button>
      </div>

      {/* 송수신 대상 테이블 - 추가 */}
      {showPeers && (
        <div style={{ margin: '8px 0 12px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', fontFamily: 'monospace' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>구분</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Source Address</th>
                <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Destination Address</th>
              </tr>
            </thead>
            <tbody>
              {peers.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: '10px 12px', color: '#888', textAlign: 'center', backgroundColor: '#fff' }}>
                    수집된 데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                peers.map((p, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                    <td style={{ padding: '6px 12px', borderBottom: '1px solid #eee',
                      color: p.dir === '[받은 패킷]' ? '#1565c0' : p.dir === '[보내는 패킷]' ? '#2e7d32' : '#999'
                    }}>
                      {p.dir}
                    </td>
                    <td style={{ padding: '6px 12px', borderBottom: '1px solid #eee', color: '#111' }}>{p.src}</td>
                    <td style={{ padding: '6px 12px', borderBottom: '1px solid #eee', color: '#111' }}>{p.dst}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 패킷 로그 모니터 영역 */}
      <div style={{
        marginTop: '20px',
        height: '700px',
        overflowY: 'auto',
        background: '#1e1e1e',
        color: '#00ff00',
        padding: '15px',
        fontFamily: 'monospace',
        fontSize: '13px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        borderRadius: '8px'
      }}>
        {logs.map((log, i) => (
          <div key={i} style={{ borderBottom: '1px dashed #333', paddingBottom: '8px', marginBottom: '8px' }}>
            {log}
          </div>
        ))}
        {logs.length === 0 && <div style={{ color: '#aaa' }}>수신된 패킷이 없습니다. 대기 중...</div>}
      </div>
    </>
  );
}

export default TestPcap4j;