import { useState } from 'react';

const ShowCode = ({ sourceCode }) => {
  const [isOpen, setIsOpen] = useState(false); // 상태명과 컴포넌트명을 구분
  

  const cleanedCode = sourceCode
    .split('\n') 
    .filter(line => !line.includes('DeleteShowCodeLine')) //DeleteShowCodeLine 주석있는 라인 삭제
    .join('\n')
    .trim();

  return (
    <>
    <div style={{marginBottom: '10px'}}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ marginTop: '5px',marginBottom: '5px'}}>
        {isOpen ? 'Close-Code ▲' : 'Show-Code ▼'}
      </button>
      
      {isOpen && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#282c34',
          color: '#abb2bf',
          borderRadius: '5px',
          overflowX: 'auto',
          textAlign: 'left',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {cleanedCode}
          </pre>
        </div>
      )}
      <hr />
    </div>
    
    </>
  );
};

export default ShowCode;