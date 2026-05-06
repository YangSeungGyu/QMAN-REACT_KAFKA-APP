function SwagerView() {

  return(
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="http://localhost:8199/swagger"
        title="Swagger UI"
        style={{
          width: '100%',
          height: '100vh', // 뷰포트 높이의 100%
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
}
export default SwagerView 