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
        
         {/*메모 메뉴 start*/}
        <li>
          <div
            onClick={() => toggleMenu('memo')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', color: '#fff', fontWeight: 'bold', fontSize: '14px',
              cursor: 'pointer', borderRadius: '6px', userSelect: 'none',
              transition: 'background-color 0.2s', marginBottom: '2px',
              backgroundColor: openMenu === 'memo' ? '#ffffff11' : 'transparent',
            }}
          >
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: openMenu === 'memo' ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '12px',
            }}>▶</span>
            메모
          </div>

          <ul style={{
            listStyle: 'none',
            padding: '0 0 0 16px',
            margin: '0',
            borderLeft: '2px solid #321fdb55',
            marginLeft: '16px',
            maxHeight: openMenu === 'memo' ? '400px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}>
            <li><Link to="/memo/memo01" style={menuItemStyle('/memo/memo01')}>VS_CODE</Link></li>
            <li><Link to="/memo/memo02" style={menuItemStyle('/memo/memo02')}>REACT_설치</Link></li>
            <li><Link to="/memo/memo03" style={menuItemStyle('/memo/memo03')}>REACT_구조</Link></li>
            <li><Link to="/memo/memo04" style={menuItemStyle('/memo/memo04')}>REACT_사용</Link></li>
            <li><Link to="/memo/memo05" style={menuItemStyle('/memo/memo05')}>REACT_기타</Link></li>
            <li><Link to="/memo/memo06" style={menuItemStyle('/memo/memo06')}>REDUX-SAGA</Link></li>
            <li><Link to="/memo/memo07" style={menuItemStyle('/memo/memo07')}>반도체공장용어</Link></li>
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
            maxHeight:  openMenu === 'test' ? '450px' : '0px',
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

        <li>
          <Link to="/kafka/TestKafka" style={menuItemStyle('/kafka/TestKafka')}>Kafka</Link>
        </li>
      </ul>
    </aside>
  );
}
export default SideLayout;