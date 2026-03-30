import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'src/features/auth/useAuthStore';

function TopLayout({ titleColor, titleTxt }) {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuthStore();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logout();
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
