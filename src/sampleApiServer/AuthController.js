import authData from './sampleMobileAuthMock.json';
import userData from './sampleUserMock.json';


const AuthController = {
  apiCheckMobileAuth: async (param) => {
    await new Promise((resolve) => setTimeout(resolve, 200));    
    const formattedPhone = param.phone.replaceAll('-', '');
    
    const matchedAuth = authData.find((auth) => 
      auth.name === param.name &&
      auth.ssnFront === param.ssnFront &&
      auth.ssnBackFirst === param.ssnBackFirst &&
      auth.phone === formattedPhone
    );


    if (matchedAuth) {
      return { status: 200, data: { isSuccess: true, ci: matchedAuth.ci , message: "성공" } };
    }  
    return { status: 200, data: { isSuccess: false, ci: null , message: "일치하는 사용자 정보가 없습니다." }};
  },

  apiCheckUserId: async (param) => {
    let chkId = param.id

    await new Promise((resolve) => setTimeout(resolve, 200));
    const isDupl = userData.some((userData) => userData.id === chkId);
    
    return { status: 200, data: { isDupl: isDupl} };
  }
};

export default AuthController;