import userData from './sampleUserMock.json';


const LoginController = {
  authenticate: async (formData) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const id = formData.get('username');
    const pw = formData.get('password');

    const user = userData.find((u) => u.id === id && u.pw === pw);

    if (user) {
      return {
        status: 200,
        data: {
          accessToken: 'mock-jwt-token-'+btoa(user.id),
          id:user.id,
          nm:user.nm
        }
      };
    } else {
      return {
        status: 401,
        data: null,
        message: "아이디 또는 비밀번호가 틀렸습니다."
      };
    }
  }
};

export default LoginController;