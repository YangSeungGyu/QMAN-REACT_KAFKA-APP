import { useState, useEffect } from 'react';

//내부 참조 소스 링크
import commJsSourceCode from '@/js/comm.js?raw'; 
import joinMemberJsSourceCode from '@/js/join/joinValidation?raw';  
import customButtonSourceCode from '@/components/Atom/CustomButton?raw';  
import modalLayoutSourceCode from '@/components/Modal/ModalLayout?raw';  
import bodyMemberConfirmSourceCode from '@/components/Modal/BodyMemberConfirm?raw';  
import bodyJoinFinalConfirmSourceCode from '@/components/Modal/BodyJoinFinalConfirm?raw';  
import bodyTestSampleSourceCode from '@/components/Modal/BodyTestSample?raw';  
import useAuthStoreSourceCode from '@/js/auth/useAuthStore?raw'; 
import PaginationSourceCode from '@/components/Common/Pagination?raw';  
import datepickerCalendarSourceCode from '@/components/Atom/DatepickerCalendar?raw'; 
import baseCalendarSourceCode from '@/components/Atom/BaseCalendar?raw'; 
import postSliceSourceCode from '@/features/post/postSlice?raw';

const ShowCode = ({ sourceCode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [isSubView, setIsSubView] = useState(false);


  const subSourceCodeObj = { 
    '@/js/comm.js': commJsSourceCode
	,'@/js/join/joinValidation': joinMemberJsSourceCode
	,'@/components/Atom/CustomButton': customButtonSourceCode
	,'@/components/Modal/ModalLayout': modalLayoutSourceCode
	,'@/components/Modal/BodyMemberConfirm': bodyMemberConfirmSourceCode
	,'@/components/Modal/BodyJoinFinalConfirm': bodyJoinFinalConfirmSourceCode
	,'@/components/Modal/BodyTestSample': bodyTestSampleSourceCode
	,'@/js/auth/useAuthStore': useAuthStoreSourceCode
	,'@/components/Common/Pagination': PaginationSourceCode
	,'@/components/Atom/DatepickerCalendar': datepickerCalendarSourceCode
	,'@/components/Atom/BaseCalendar': baseCalendarSourceCode
	,'@/features/post/postSlice': postSliceSourceCode
  } 

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
                setCurrentCode(subSourceCodeObj[key]); 
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
          style={{ color: 'skyblue' }}
        >
          [Back to the Component]
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