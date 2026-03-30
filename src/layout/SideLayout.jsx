import { Link } from 'react-router-dom';

function SideLayout() {
  return (
    <aside className="side-menu">
      <h3>메뉴[SideLayout]</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/">홈</Link></li>
        <li><Link to="/board/boardList">게시판</Link></li>   
        <li><Link to="/test/test02">테스트-기본컴포넌트</Link></li>
        <li><Link to="/test/test01">테스트-Calendar</Link></li>
        <li><Link to="/test/titleTest">테스트-외부변경</Link></li>
        <li><Link to="/test/test03">테스트-로그인</Link></li>
        <li><Link to="/test/basicGrid">테스트-기본그리드</Link></li>
        <li><Link to="/test/pageGrid">테스트-페이지그리드</Link></li>

       <li><Link to="/kafka/TestKafka">카프카테스트</Link></li>
        
      </ul>
    </aside>
  );
}
export default SideLayout;