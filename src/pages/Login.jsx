import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'src/features/auth/useAuthStore';
import { comm } from 'src/context/comm.js';
import { history } from 'src/history';

import 'src/style/pages/Login.css';

import userData from 'src/sampleApiServer/sampleUserMock.json';

function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const navigate    = useNavigate();

  const { login, loading } = useAuthStore();

  const loginAction = async () => {
    if (!id || !pw) return comm.customAlert('아이디와 비밀번호를 입력하세요.');
    const result = await login({ id, pw });
    if (result.success) {
      comm.customAlert(result.data.nm + '님 반갑습니다!');
      history.push('/');
    } else {
      comm.customAlert(result.message);
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') loginAction();
  };

  return (
    <>
      <div className="login-page-container">
        <div className="login-card">
          <h2 className="login-title">Q-Man 시스템 로그인</h2>

          <div className="input-group-container">
            <div className="input-row">
              <label>아이디</label>
              <input
                className="input-field"
                placeholder="아이디를 입력하세요"
                value={id}
                onChange={(e) => setId(e.target.value)}
                onKeyDown={handleOnKeyPress}
              />
            </div>
          </div>

          <div className="input-group-container">
            <div className="input-row">
              <label>비밀번호</label>
              <input
                type="password"
                className="input-field"
                placeholder="비밀번호를 입력하세요"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={handleOnKeyPress}
              />
            </div>
          </div>

          <button
            className="login-submit-btn"
            onClick={loginAction}
            disabled={loading}
            style={{ cursor: loading ? 'wait' : 'pointer' }}
          >
            로그인
          </button>

          <div className="login-helper">
            <span onClick={() => navigate('/member/joinMember')}>회원가입</span>
            <span className="divider">|</span>
            <span onClick={() => comm.customAlert('미구현')}>아이디/비밀번호 찾기</span>
          </div>
        </div>
      </div>
      <section className="test-section">
        <div>TEST-INFO:</div>
        <br />
        <div>계정 정보 :</div>
        <div>{JSON.stringify(userData, null, 2)}</div>
      </section>
    </>
  );
}

export default Login;
