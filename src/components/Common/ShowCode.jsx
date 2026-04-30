import { useState, useEffect } from 'react';

const ShowCode = ({ sourceCode, subSourceCodeObj }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [isSubView, setIsSubView] = useState(false);

  const cleanedCode = sourceCode
    .split('\n')
    .filter(line => !line.includes('DeleteShowCodeLine'))
    .join('\n')
    .trim();

  useEffect(() => {
    setCurrentCode(cleanedCode);
    setIsSubView(false);
  }, [cleanedCode]);

  const renderCode = () => {
  if (!subSourceCodeObj) return currentCode;

  let parts = [currentCode];

  Object.keys(subSourceCodeObj).forEach((key) => {
    parts = parts.flatMap((part, idx) => {
      if (typeof part !== 'string') return part;

      return part.split(key).flatMap((splitPart, i, arr) => {
        if (i < arr.length - 1) {
          return [
            splitPart,
            <a
              key={key + i + idx}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentCode(subSourceCodeObj[key]); // ✅ 해당 key로 이동
                setIsSubView(true);
              }}
              style={{ color: 'skyblue' }}
            >
              {key}
            </a>,
          ];
        }
        return splitPart;
      });
    });
  });

  // ✅ back 처리
  if (isSubView) {
    return (
      <>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentCode(cleanedCode);
            setIsSubView(false);
          }}
          style={{ color: 'orange' }}
        >
          [back]
        </a>
        {'\n'}
        {parts}
      </>
    );
  }

  return parts;
};

  return (
    <>
      <div style={{ marginBottom: '10px', marginTop: '-20px' }}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close-Code ▲' : 'Show-Code ▼'}
        </button>

        {isOpen && (
          <div
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#282c34',
              color: '#abb2bf',
              borderRadius: '5px',
            }}
          >
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {renderCode()}
            </pre>
          </div>
        )}
        <hr />
      </div>
    </>
  );
};

export default ShowCode;