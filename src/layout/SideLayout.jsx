import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';


function SideLayout() {
 const [openMenu, setOpenMenu] = useState(null);
 const toggleMenu = (menu) => {
  setOpenMenu(prev => (prev === menu ? null : menu));
};

  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItemStyle = (path) => ({
    display: 'block',
    padding: '8px 16px',
     color: '#fff',
      fontWeight: 'bold',
    backgroundColor: isActive(path) ? '#321fdb' : 'transparent',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.2s',
    marginBottom: '2px',
  });

  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#2c2c3e',
      padding: '16px 8px',
      boxSizing: 'border-box',
    }}>
      

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link to="/" style={menuItemStyle('/')}>HOME</Link>
        </li>
        <li><Link to="/swager" style={menuItemStyle('/swager')}>Swager</Link></li>

        <li><Link to="/path" style={menuItemStyle('/path')}>Tree 구조</Link></li>
        
         {/*메모 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('memoReact')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'memoReact' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'memoReact' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            React 학습
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'memoReact' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/memo/react01" style={menuItemStyle('/memo/react01')}>VS_CODE</Link></li>
            <li><Link to="/memo/react02" style={menuItemStyle('/memo/react02')}>REACT_설치</Link></li>
            <li><Link to="/memo/react03" style={menuItemStyle('/memo/react03')}>REACT_구조</Link></li>
            <li><Link to="/memo/react04" style={menuItemStyle('/memo/react04')}>REACT_사용</Link></li>
            <li><Link to="/memo/react05" style={menuItemStyle('/memo/react05')}>REACT_기타</Link></li>
            <li><Link to="/memo/react06" style={menuItemStyle('/memo/react06')}>REDUX-SAGA</Link></li>
          </ul>
        </li>
        {/*메모 메뉴 end*/}

        {/*메모 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('memoOracle')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'memoOracle' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'memoOracle' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            Oracle 학습
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'memoOracle' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/memo/oracle01" style={menuItemStyle('/memo/oracle01')}>오라클 기본</Link></li>
            <li><Link to="/memo/oracle02" style={menuItemStyle('/memo/oracle02')}>오라클 조인</Link></li>
            <li><Link to="/memo/oracle03" style={menuItemStyle('/memo/oracle03')}>오라클 재귀호출</Link></li>
            <li><Link to="/memo/oracle04" style={menuItemStyle('/memo/oracle04')}>오라클 내장함수</Link></li>
            <li><Link to="/memo/oracle05" style={menuItemStyle('/memo/oracle05')}>오라클 DML</Link></li>
            <li><Link to="/memo/oracle06" style={menuItemStyle('/memo/oracle06')}>오라클 합산</Link></li>
          </ul>
        </li>
        {/*메모 메뉴 end*/}

        {/*메모 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('memoOther')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'memoOther' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'memoOther' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            기타 학습
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'memoOther' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/memo/other01" style={menuItemStyle('/memo/other01')}>반도체공장용어</Link></li>
          </ul>
        </li>
        {/*메모 메뉴 end*/}

        


        {/*게시판 Grid 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('board')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'board' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'board' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            게시판
          </div>
          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'board' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/board/boardList" style={menuItemStyle('/board/boardList')}>table게시판</Link></li>
            <li><Link to="/test/basicGrid" style={menuItemStyle('/test/basicGrid')}>기본그리드</Link></li>
            <li><Link to="/test/pageGrid" style={menuItemStyle('/test/pageGrid')}>페이지그리드</Link></li>
          </ul>
        </li>
        {/*게시판 Grid 메뉴 end*/}

        {/*테스트 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('test')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'test' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform:  openMenu === 'test' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            테스트(참조)
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight:  openMenu === 'test' ? '510px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/test/test02" style={menuItemStyle('/test/test02')}>기본컴포넌트</Link></li>
            <li><Link to="/test/testCustomConfirm" style={menuItemStyle('/test/testCustomConfirm')}>CustomConfirm</Link></li>
            <li><Link to="/test/test01" style={menuItemStyle('/test/test01')}>Calendar</Link></li>
            <li><Link to="/test/titleTest" style={menuItemStyle('/test/titleTest')}>외부변경</Link></li>
            <li><Link to="/test/test03" style={menuItemStyle('/test/test03')}>로그인확인</Link></li>
            <li><Link to="/test/testFlow" style={menuItemStyle('/test/testFlow')}>Flow</Link></li>
            <li><Link to="/test/testChart" style={menuItemStyle('/test/testChart')}>차트</Link></li>
            <li><Link to="/test/testSaga" style={menuItemStyle('/test/testSaga')}>Saga</Link></li>
            <li><Link to="/test/testAntdUi" style={menuItemStyle('/test/testAntdUi')}>AntdUi</Link></li>
            <li><Link to="/test/testSoket" style={menuItemStyle('/test/testSoket')}>Soket</Link></li>
            <li><Link to="/test/testExcel" style={menuItemStyle('/test/testExcel')}>Excel</Link></li>
            <li><Link to="/test/testScheduler" style={menuItemStyle('/test/testScheduler')}>Scheduler</Link></li>
            <li><Link to="/test/testPcap4j" style={menuItemStyle('/test/testPcap4j')}>TestPcap4j</Link></li>
          </ul>
        </li>
        {/*테스트 메뉴 end*/}

        {/*테스트 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('free')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor:  openMenu === 'free' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'free' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            임시테스트
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'free' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/test/testFree01" style={menuItemStyle('/test/testFree01')}>테스트01</Link></li>
            <li><Link to="/test/testFree02" style={menuItemStyle('/test/testFree02')}>테스트02</Link></li>
          </ul>
        </li>
        {/*테스트 메뉴 end*/}

        
        {/*
        <li>
          <Link to="/kafka/TestKafka" style={menuItemStyle('/kafka/TestKafka')}>Kafka</Link>
        </li>
        */}

        {/*three 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('three')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'three' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'three' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            threeJs
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'three' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/three/threeJs01" style={menuItemStyle('/three/threeJs01')}>threeJs01</Link></li>
          </ul>
        </li>
        {/*three 메뉴 end*/}

      </ul>
    </aside>
  );
}
export default SideLayout;