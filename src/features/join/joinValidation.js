import { comm } from 'src/context/CommonContext';

//입력창 검증 규칙
export const FIELD_RULES = {
  name: {
    regex: /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*$/,
    targetNm: '이름',
    maxLength: 30,
    errorMessage: "한글/영문 30자 이내로 입력하세요."
  },
  ssnFront: {
    regex: /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
    targetNm: '주민등록번호',
    maxLength: 6,
    errorMessage: "주민등록번호 앞자리 형식이 올바르지 않습니다."
  },
  ssnBackFirst: {
    regex: /^[1-8]$/,
    targetNm: '주민등록번호',
    maxLength: 1,
    errorMessage: "주민등록번호 뒷자리 형식이 올바르지 않습니다.",
    validator: (value, obj) => {
      if (!value || !obj.ssnFront || obj.ssnFront.length < 6) return true;
      const inputYear = parseInt(obj.ssnFront.substring(0, 2), 10);
      const backDigit = parseInt(value, 10);
      const currentYear = new Date().getFullYear() % 100;
      const is2000s = inputYear <= currentYear;
      return is2000s ? [3, 4, 7, 8].includes(backDigit) : [1, 2, 5, 6].includes(backDigit);
    }
  },
  phone: {
    regex: /^[0-9-]*$/,
    targetNm: '전화번호',
    maxLength: 13,
    errorMessage: "올바른 휴대폰 번호 형식이 아닙니다.",
    validator: (value) => {
      const pureNumbers = value.replace(/-/g, '');
      return pureNumbers.startsWith('010') && (pureNumbers.length === 10 || pureNumbers.length === 11);
    }
  },
  userId: {
    regex: /^[a-z0-9]{5,15}$/,
    targetNm: '아이디',
    maxLength: 15,
    errorMessage: "5~15자의 영문 소문자, 숫자만 사용 가능합니다."
  },
  password: {
    regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/,
    targetNm: '비밀번호',
    maxLength: 20,
    errorMessage: "8~20자의 영문, 숫자를 혼용하여 입력하세요."
  },
  passwordConfirm: {
    regex: /^.*$/,
    targetNm: '비밀번호 확인',
    maxLength: 20,
    errorMessage: "비밀번호가 일치하지 않습니다.",
    validator: (value, obj) => value === obj.password
  },
  email: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    targetNm: '이메일',
    maxLength: 50,
    errorMessage: "유효한 이메일 형식이 아닙니다."
  }
};

// 휴대폰 번호 검증
export const handlePhoneCheck = (e, setForm, setErrors) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES.phone;
  if (!rule.regex.test(value)) return;

  const rawValue = value.replace(/\D/g, '').slice(0, 11);
  let formattedValue = '';
  if (rawValue.length <= 3) {
    formattedValue = rawValue;
  } else if (rawValue.length <= 7) {
    formattedValue = rawValue.slice(0, 3) + '-' + rawValue.slice(3);
  } else if (rawValue.length <= 10) {
    formattedValue = rawValue.slice(0, 3) + '-' + rawValue.slice(3, 6) + '-' + rawValue.slice(6);
  } else {
    formattedValue = rawValue.slice(0, 3) + '-' + rawValue.slice(3, 7) + '-' + rawValue.slice(7);
  }

  setForm(prev => ({ ...prev, [name]: formattedValue }));
  const isValid = (rawValue.length >= 10) ? rule.validator(formattedValue) : true;
  setErrors(prev => ({ ...prev, [name]: isValid ? '' : rule.errorMessage }));
};

// 주민번호 앞자리 검증
export const handleSsnFrontCheck = (e, setForm, setErrors) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES.ssnFront;
  if (value.length > rule.maxLength || !/^\d*$/.test(value)) return;

  setForm(prev => ({ ...prev, [name]: value }));
  const isValid = value.length === rule.maxLength ? rule.regex.test(value) : true;
  setErrors(prev => ({ ...prev, [name]: isValid ? '' : rule.errorMessage }));
};

// 기타 검증
export const handleBaseCheck = (e, setForm, setErrors, currentForm) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES[name];
  if (!rule || value.length > rule.maxLength) return;

  setForm(prev => ({ ...prev, [name]: value }));
  let isValid = rule.regex.test(value);
  if (isValid && typeof rule.validator === 'function') {
    isValid = rule.validator(value, { ...currentForm, [name]: value });
  }
  setErrors(prev => ({ ...prev, [name]: (value === '' || isValid) ? '' : rule.errorMessage }));
};

// 확인버튼 전체 검증
export const validateBeforeVerify = async (form, isVerified, inputRefs) => {
  if (isVerified) {
    await comm.customAlert('이미 본인 인증을 완료 하였습니다.');
    return false;
  }
  const fieldsToVerify = ['name', 'ssnFront', 'ssnBackFirst', 'phone'];
  for (const field of fieldsToVerify) {
    const value = form[field];
    const rule = FIELD_RULES[field];
    const targetInput = inputRefs[field]?.current;

    if (!value) {
      await comm.customAlert(rule.targetNm + '을(를) 입력해 주세요');
      targetInput?.focus();
      return false;
    }
    if (!rule.regex.test(value)) {
      await comm.customAlert(rule.errorMessage);
      targetInput?.focus();
      return false;
    }
    if ('validator' in rule && typeof rule.validator === 'function') {
      const isValid = field === 'ssnBackFirst' ? rule.validator(value, form) : rule.validator(value, null);
      if (!isValid) {
        await comm.customAlert(rule.errorMessage);
        targetInput?.focus();
        return false;
      }
    }
  }
  return true;
};

// 아이디 입력 검증
export const handleIdInputCheck = (e, setForm, setErrors, setIsIdAvailable) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES.userId;
  if (value.length > rule.maxLength) return;

  setForm(prev => ({ ...prev, [name]: value }));
  setIsIdAvailable(false);

  const isValid = value === '' || rule.regex.test(value);
  setErrors(prev => ({ ...prev, [name]: isValid ? '' : rule.errorMessage }));
};

// 아이디 중복확인 버튼 사전 검증
export const validateIdForApi = async (userId, inputRef) => {
  const rule = FIELD_RULES.userId;
  if (!userId) {
    await comm.customAlert('아이디를 입력해주세요.');
    inputRef.current?.focus();
    return false;
  }
  if (!rule.regex.test(userId)) {
    await comm.customAlert(rule.errorMessage);
    inputRef.current?.focus();
    return false;
  }
  return true;
};

// 비밀번호 검증
export const handlePasswordCheck = (e, setForm, setErrors, currentForm) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES.password;
  if (value.length > rule.maxLength) return;

  const nextForm = { ...currentForm, [name]: value };
  setForm(nextForm);

  const isValid = value === '' || rule.regex.test(value);
  setErrors(prev => {
    const newErrors = { ...prev, [name]: isValid ? '' : rule.errorMessage };
    if (currentForm.passwordConfirm) {
      const isMatch = value === currentForm.passwordConfirm;
      newErrors.passwordConfirm = isMatch ? '' : FIELD_RULES.passwordConfirm.errorMessage;
    }
    return newErrors;
  });
};

// 비밀번호 확인 검증
export const handlePasswordConfirmCheck = (e, setForm, setErrors, currentForm) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES.passwordConfirm;
  if (value.length > rule.maxLength) return;

  setForm(prev => ({ ...prev, [name]: value }));
  const isMatch = value === '' || value === currentForm.password;
  setErrors(prev => ({ ...prev, [name]: isMatch ? '' : rule.errorMessage }));
};

// 이메일 검증
export const handleEmailCheck = (e, setForm, setErrors) => {
  const { name, value } = e.target;
  const rule = FIELD_RULES.email;
  if (value.length > rule.maxLength) return;

  setForm(prev => ({ ...prev, [name]: value }));
  const isValid = value === '' || rule.regex.test(value);
  setErrors(prev => ({ ...prev, [name]: isValid ? '' : rule.errorMessage }));
};