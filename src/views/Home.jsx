import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { comm } from '@/js/comm.js';
import TestPcap4j from "@/views/test/TestPcap4j";

function Home() {
  const [text, setText] = useState("");
  const [memInfo,     setMemInfo]     = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);
  const [connected,   setConnected]   = useState(false);
  const clientRef = useRef(null);

  // 1. MAIN.txt 파일 읽어오기
  useEffect(() => {
    fetch("/memo/MAIN.txt")
      .then((res) => res.text())
      .then((data) => setText(data))
      .catch((err) => console.error("파일 로드 실패:", err));
  }, []);

  // 2. 웹소켓(STOMP) 연결 — /memory, /storage 동시 구독
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(comm.API_URL + "/ws"),
      reconnectDelay: 0,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setConnected(true);

        client.subscribe("/memory", (message) => {
          try { setMemInfo(JSON.parse(message.body)); }
          catch (e) { console.error("memory JSON 파싱 실패", e); }
        });

        client.subscribe("/storage", (message) => {
          try { setStorageInfo(JSON.parse(message.body)); }
          catch (e) { console.error("storage JSON 파싱 실패", e); }
        });
      },
      onDisconnect: () => {
        setConnected(false);
        setMemInfo(null);
        setStorageInfo(null);
      },
      onStompError: (frame) => {
        console.error("STOMP 에러: " + frame.headers["message"]);
      }
    });

    client.activate();
    clientRef.current = client;

    return () => { clientRef.current?.deactivate(); };
  }, []);

  // ── 공통 유틸 ──────────────────────────────────

  const barColor = (pct) => {
    if (pct >= 85) return "#E24B4A";
    if (pct >= 60) return "#EF9F27";
    return "#1D9E75";
  };

  const UsageBar = ({ pct }) => (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>
        <span>Usage</span>
        <span style={{ fontWeight: 600, color: barColor(pct) }}>{pct}%</span>
      </div>
      <div style={{ background: '#eee', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: barColor(pct),
          borderRadius: '4px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );

  const CardPlaceholder = ({ connected, label }) => {
    if (!connected) return <pre style={{ margin: 0, textAlign: 'center', color: '#888' }}>서버 연결 중...</pre>;
    return <pre style={{ margin: 0, textAlign: 'center', color: '#888' }}>{label} 수신 대기 중...</pre>;
  };

  const UnsupportedMsg = () => (
    <p style={{ margin: 0, textAlign: 'center', color: '#E24B4A', fontSize: '0.85rem' }}>사용 불가한 OS입니다.</p>
  );

  // ── Memory 렌더링 ───────────────────────────────

  const renderMemoryTable = () => {
    if (!connected || !memInfo) return <CardPlaceholder connected={connected} label="메모리 데이터" />;
    if (memInfo.unsupported)    return <UnsupportedMsg />;

    const rows = [
      { label: "Total",     value: memInfo.totalMb     },
      { label: "Used",      value: memInfo.usedMb      },
      { label: "Free",      value: memInfo.freeMb      },
      { label: "Available", value: memInfo.availableMb },
      { label: "Cached",    value: memInfo.cachedMb    },
    ];

    return (
      <div>
        <UsageBar pct={memInfo.usedPercent} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', fontFamily: 'monospace' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left',  padding: '5px 4px', color: '#888', fontWeight: 500 }}>항목</th>
              <th style={{ textAlign: 'right', padding: '5px 4px', color: '#888', fontWeight: 500 }}>값</th>
              <th style={{ textAlign: 'right', padding: '5px 4px', color: '#888', fontWeight: 500 }}>비율</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ label, value }) => (
              <tr key={label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 4px', color: '#555' }}>{label}</td>
                <td style={{ padding: '6px 4px', textAlign: 'right', color: '#333', fontWeight: 500 }}>
                  {value.toLocaleString()} MB
                </td>
                <td style={{ padding: '6px 4px', textAlign: 'right', color: '#888' }}>
                  {memInfo.totalMb > 0 ? `${Math.round(value / memInfo.totalMb * 1000) / 10}%` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ── Storage 렌더링 ──────────────────────────────

  const renderStorageTable = () => {
    if (!connected || !storageInfo) return <CardPlaceholder connected={connected} label="스토리지 데이터" />;
    if (storageInfo.unsupported)    return <UnsupportedMsg />;

    return (
      <div>
        <UsageBar pct={storageInfo.usedPercent} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', fontFamily: 'monospace' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
              <th style={{ textAlign: 'left',  padding: '5px 4px', color: '#888', fontWeight: 500 }}>경로</th>
              <th style={{ textAlign: 'right', padding: '5px 4px', color: '#888', fontWeight: 500 }}>전체</th>
              <th style={{ textAlign: 'right', padding: '5px 4px', color: '#888', fontWeight: 500 }}>사용</th>
              <th style={{ textAlign: 'right', padding: '5px 4px', color: '#888', fontWeight: 500 }}>여유</th>
              <th style={{ textAlign: 'right', padding: '5px 4px', color: '#888', fontWeight: 500 }}>사용률</th>
            </tr>
          </thead>
          <tbody>
            {storageInfo.partitions.map((p) => (
              <tr key={p.path} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '6px 4px', color: '#555' }}>{p.path}</td>
                <td style={{ padding: '6px 4px', textAlign: 'right', color: '#333', fontWeight: 500 }}>{p.totalGb} GB</td>
                <td style={{ padding: '6px 4px', textAlign: 'right', color: '#333' }}>{p.usedGb} GB</td>
                <td style={{ padding: '6px 4px', textAlign: 'right', color: '#333' }}>{p.freeGb} GB</td>
                <td style={{ padding: '6px 4px', textAlign: 'right', color: barColor(p.usedPercent), fontWeight: 600 }}>
                  {p.usedPercent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ── JSX ────────────────────────────────────────

  return (
    <div className="home-container">
      <h2 style={{ marginBottom: '1.5rem' }}>HOME</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
        {/* Card01 — Memory */}
        <div className="stat-card" style={{ flex: 1, minWidth: '350px', padding: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Server Memory Info</h4>
          <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '6px' }}>
            {renderMemoryTable()}
          </div>
        </div>

        {/* Card02 — Storage */}
        <div className="stat-card" style={{ flex: 1, minWidth: '350px', padding: '15px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Server Storage Info</h4>
          <div style={{ backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '6px' }}>
            {renderStorageTable()}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>        
        <TestPcap4j />
      </div>

      <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>React-Sample 참조</h2>
        <h3>
          <pre>{text}</pre>
        </h3>
      </div>
    </div>
  );
}

export default Home;
