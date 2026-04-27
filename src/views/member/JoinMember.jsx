import React, { useState, useRef } from 'react';
import { comm } from 'src/context/comm.js';
import { history } from 'src/history';
import CustomButton from 'src/components/Atom/CustomButton';
import ModalLayout from 'src/components/Modal/ModalLayout';
import BodyMemberConfirm from 'src/components/Modal/BodyMemberConfirm';
import BodyJoinFinalConfirm from 'src/components/Modal/BodyJoinFinalConfirm';
import * as joinMember from 'src/features/join/joinValidation';

import 'src/style/member/JoinMember.css';

import authData from 'src/sampleApiServer/sampleMobileAuthMock.json';
import userData from 'src/sampleApiServer/sampleUserMock.json';

const JoinMember = () => {

  // 로딩 상태
  const [authLoading, setAuthLoading]   = useState(false);
  const [idLoading, setIdLoading]       = useState(false);
  const [joinLoading, setJoinLoading]   = useState(false);

  // UI 상태
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isVerified, setIsVerified]         = useState(false);
  const [isIdAvailable, setIsIdAvailable]   = useState(false);

  const [form, setForm] = useState({
    name: '',
    ssnFront: '',
    ssnBackFirst: '',
    phone: '',
    ci: '',
    userId: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const inputRefs = {
    name:            useRef(null),
    ssnFront:        useRef(null),
    ssnBackFirst:    useRef(null),
    phone:           useRef(null),
    userId:          useRef(null),
    password:        useRef(null),
    passwordConfirm: useRef(null),
    email:           useRef(null),
  };

  // ================================= [STEP 1] 본인인증 =================================

  // 본인인증 모달 열기 전 유효성 검사
  const handleVerifyOpen = async () => {
    const isValid = await joinMember.validateBeforeVerify(form, isVerified, inputRefs);
    if (isValid) setIsModalOpen(true);
  };

  // 본인인증 API 직접 호출
  const handleVerifyConfirm = async () => {
    setAuthLoading(true);
    try {
      const data = await comm.axiosPost('/member/checkMobileAuth', form);
      if (data.isSuccess) {
        comm.customAlert('본인 확인에 성공하였습니다.');
        setForm(prev => ({ ...prev, ci: data.ci }));
        setIsVerified(true);
        setIsModalOpen(false);
        setErrors({});
      } else {
        comm.customAlert(data.message || '인증 실패');
      }
    } catch (e) {
      comm.customAlert(e.response?.data?.message || e.message || '본인인증에 실패했습니다.');
    } finally {
      setAuthLoading(false);
    }
  };

  // ================================= [STEP 2] 아이디 중복확인 =================================

  const handleCheckUserId = async () => {
    const isValid = await joinMember.validateIdForApi(form.userId, inputRefs.userId);
    if (!isValid) return;

    setIdLoading(true);
    try {
      const isDuplicated = await comm.axiosPost('/member/checkUserId', { userId: form.userId });
      if (isDuplicated) {
        comm.customAlert('이미 사용 중인 아이디입니다.');
        setIsIdAvailable(false);
        setErrors(prev => ({ ...prev, userId: '이미 사용 중인 아이디입니다.' }));
      } else {
        comm.customAlert('사용 가능한 아이디입니다.');
        setIsIdAvailable(true);
        setErrors(prev => ({ ...prev, userId: '사용 가능한 아이디입니다.' }));
      }
    } catch (e) {
      comm.customAlert(e.response?.data?.message || e.message || '아이디 확인 중 오류가 발생했습니다.');
    } finally {
      setIdLoading(false);
    }
  };

  // ================================= [STEP 3] 최종 회원가입 =================================

  const handleJoinConfirm = async () => {
    if (!isVerified)    return comm.customAlert('본인 인증이 필요합니다.');
    if (!isIdAvailable) return comm.customAlert('아이디 중복 확인이 필요합니다.');

    const fields = ['userId', 'password', 'passwordConfirm', 'email'];
    for (const f of fields) {
      if (!form[f] || (errors[f] && f !== 'userId')) {
        await comm.customAlert(`${f} 항목을 확인해주세요.`);
        inputRefs[f].current?.focus();
        return;
      }
    }
    setIsJoinModalOpen(true);
  };

  const handleFinalSubmit = async () => {
    setIsJoinModalOpen(false);
    setJoinLoading(true);
    try {
      await comm.axiosPost('/member/join', form);
      comm.customAlert('회원가입이 완료되었습니다!');
      history.push('/login');
    } catch (e) {
      comm.customAlert(e.response?.data?.message || e.message || '회원가입 처리 중 오류가 발생했습니다.');
    } finally {
      setJoinLoading(false);
    }
  };

  // ================================= 유효성 검사 핸들러 연결 =================================
  const phoneCheck      = (e) => joinMember.handlePhoneCheck(e, setForm, setErrors);
  const ssnFrontCheck   = (e) => joinMember.handleSsnFrontCheck(e, setForm, setErrors);
  const baseCheck       = (e) => joinMember.handleBaseCheck(e, setForm, setErrors, form);
  const idInputCheck    = (e) => joinMember.handleIdInputCheck(e, setForm, setErrors, setIsIdAvailable);
  const pwCheck         = (e) => joinMember.handlePasswordCheck(e, setForm, setErrors, form);
  const pwConfirmCheck  = (e) => joinMember.handlePasswordConfirmCheck(e, setForm, setErrors, form);
  const emailCheck      = (e) => joinMember.handleEmailCheck(e, setForm, setErrors);

  return (
    <>
      <div className="join-member-container">
        {/* 본인 정보 섹션 */}
        <section className="join-section">
          <h2 className="section-title">본인 정보 확인</h2>
          <div className="input-group-container">
            <label>이름</label>
            <input type="text" name="name" className={'input-field ' + (errors.name ? 'error-border' : '')}
              value={form.name} ref={inputRefs.name} onInput={baseCheck} readOnly={isVerified} />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          <div className="input-group-container">
            <label>주민등록번호</label>
            <div className="ssn-input-group">
              <input type="text" name="ssnFront" className={'input-field ' + (errors.ssnFront ? 'error-border' : '')}
                maxLength={6} value={form.ssnFront} ref={inputRefs.ssnFront} onInput={ssnFrontCheck} readOnly={isVerified} />
              <span>-</span>
              <div className="ssn-back-container">
                <input type="text" name="ssnBackFirst"
                  className={'input-field ssn-back-first ' + (errors.ssnBackFirst ? 'error-border' : '')}
                  maxLength={1} value={form.ssnBackFirst} ref={inputRefs.ssnBackFirst} onInput={baseCheck} readOnly={isVerified} />
                <span className="ssn-stars">******</span>
              </div>
            </div>
            {(errors.ssnFront || errors.ssnBackFirst) && <p className="error-text">{errors.ssnFront || errors.ssnBackFirst}</p>}
          </div>

          <div className="input-group-container">
            <label>전화번호</label>
            <input type="text" name="phone" className={'input-field ' + (errors.phone ? 'error-border' : '')}
              value={form.phone} ref={inputRefs.phone} onInput={phoneCheck} readOnly={isVerified} />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
          <div className="verify-btn-wrapper">
            <CustomButton label={isVerified ? '인증 완료' : '본인 확인'} onClickFunc={handleVerifyOpen} disabled={authLoading} />
          </div>
        </section>

        <ModalLayout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="정보 확인"
          modalBody={<BodyMemberConfirm formData={form} onConfirm={handleVerifyConfirm} onCancel={() => setIsModalOpen(false)} />} />

        <hr />

        {/* 계정 정보 섹션 */}
        <section className="join-section">
          <h2 className="section-title">회원 계정 정보</h2>
          <div className="input-group-container">
            <label>아이디</label>
            <div className="id-input-wrapper">
              <input type="text" name="userId" className={'input-field ' + (errors.userId ? 'error-border' : '')}
                value={form.userId} ref={inputRefs.userId} onInput={idInputCheck} readOnly={!isVerified || isIdAvailable} />
              <button type="button" className="inner-btn"
                disabled={!isVerified || isIdAvailable || idLoading} onClick={handleCheckUserId}>중복확인</button>
            </div>
            {errors.userId && <p className={'error-text ' + (isIdAvailable ? 'success-color' : '')}>{errors.userId}</p>}
          </div>

          <div className="input-group-container">
            <label>비밀번호</label>
            <input type="password" name="password" className={'input-field ' + (errors.password ? 'error-border' : '')}
              value={form.password} ref={inputRefs.password} onInput={pwCheck} readOnly={!isVerified} />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="input-group-container">
            <label>비밀번호 확인</label>
            <input type="password" name="passwordConfirm" className={'input-field ' + (errors.passwordConfirm ? 'error-border' : '')}
              value={form.passwordConfirm} ref={inputRefs.passwordConfirm} onInput={pwConfirmCheck} readOnly={!isVerified} />
            {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}
          </div>

          <div className="input-group-container">
            <label>이메일</label>
            <input type="email" name="email" className={'input-field ' + (errors.email ? 'error-border' : '')}
              value={form.email} ref={inputRefs.email} onInput={emailCheck} readOnly={!isVerified} />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div className="verify-btn-wrapper">
            <CustomButton label="회원가입" onClickFunc={handleJoinConfirm} disabled={joinLoading} />
          </div>
        </section>

        <ModalLayout isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} title="가입 확인"
          modalBody={<BodyJoinFinalConfirm formData={form} onConfirm={handleFinalSubmit} onCancel={() => setIsJoinModalOpen(false)} />} />
      </div>

      <section className="test-section">
        <div>TEST-INFO (본인확인): {JSON.stringify(authData, null, 2)}</div>
        <div>TEST-INFO (중복확인): {JSON.stringify(userData, null, 2)}</div>
      </section>
    </>
  );
};

export default JoinMember;
