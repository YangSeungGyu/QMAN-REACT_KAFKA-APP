import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/features/auth/authSlice';

function TopLayout({ titleColor, titleTxt }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //리덕스 유저정보  
  const { isLoggedIn, user} = useSelector((state) => state.auth);
  
  
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      //Redux 로그아웃 호출
      dispatch(logout());
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div>
        <h1 style={{ color: titleColor }}>{titleTxt}</h1>
      </div>

      <nav className="top-nav">
        {isLoggedIn ? (
          <div className="user-info-area">
            {/* 7. 변수명 userName으로 안전하게 출력 */}
            <span className="user-name"><strong>{user.nm}</strong>님</span>
            <span className="divider">|</span>
            <a href="#" onClick={handleLogout} className="auth-link">로그아웃</a>
          </div>
        ) : (
          <div className="user-info-area">
            <Link to="/login" className="auth-link">로그인</Link>
            <span className="divider">|</span>
            <Link to="/member/joinMember" className="auth-link">회원가입</Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default TopLayout;