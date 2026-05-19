import { comm } from '@/js/comm.js';

function SwagerView() {
    const commApiUrl = comm.API_URL;
  return(
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={commApiUrl + "/swagger"}
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