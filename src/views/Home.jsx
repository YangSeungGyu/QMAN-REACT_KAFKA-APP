import { useEffect, useState } from "react";

function Home() {

  const [text, setText] = useState("");
  useEffect(() => {
    fetch("/memo/MAIN.txt")
      .then(res => res.text())
      .then(data => setText(data));
  }, []);
  return (
    <div className="home-container">
      <h2 style={{ marginBottom: '1.5rem' }}>HOME</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
        <div className="stat-card">
          <h4>Card01</h4>
          <p className="stat-value">123123</p>
        </div>
        <div className="stat-card">
          <h4>Card02</h4>
          <p className="stat-value">AAA</p>
        </div>
        
      </div>

      <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>React-Sampe 참조</h2>
        <h3>
          <pre>{text}</pre>

        </h3>
        
      </div>
    </div>
  );
}

export default Home;