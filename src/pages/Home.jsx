function Home() {
  return (
    <div className="home-container">
      <h2 style={{ marginBottom: '1.5rem' }}>홈</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
        <div className="stat-card">
          <h4>메인 영역1</h4>
          <p className="stat-value">123123</p>
        </div>
        <div className="stat-card">
          <h4>메인 영역2</h4>
          <p className="stat-value">AAA</p>
        </div>
        
      </div>

      <div style={{ padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3>메인 영역3</h3>
        
      </div>
    </div>
  );
}

export default Home;