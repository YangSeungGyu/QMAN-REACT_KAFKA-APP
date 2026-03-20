import { call, put, takeLatest } from 'redux-saga/effects';
import { comm } from 'src/context/comm.js';
import { history } from 'src/history';
import {
  AUTH_CHECK_REQUEST, AUTH_CHECK_SUCCESS, AUTH_CHECK_FAILURE,
  ID_CHECK_REQUEST,   ID_CHECK_SUCCESS,   ID_CHECK_FAILURE,
  JOIN_FINAL_REQUEST, JOIN_FINAL_SUCCESS, JOIN_FINAL_FAILURE,
} from 'src/store/actionTypes';

function* authCheckSaga(action) {
  try {
    const data = yield call(comm.axiosPost, '/member/checkMobileAuth', action.payload);
    yield put({ type: AUTH_CHECK_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '본인인증에 실패했습니다.';
    yield put({ type: AUTH_CHECK_FAILURE, payload: msg });
  }
}

function* idCheckSaga(action) {
  try {
    const isDuplicated = yield call(comm.axiosPost, '/member/checkUserId', action.payload);
    yield put({ type: ID_CHECK_SUCCESS, payload: isDuplicated });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '아이디 확인 중 오류가 발생했습니다.';
    yield put({ type: ID_CHECK_FAILURE, payload: msg });
  }
}

function* joinFinalSaga(action) {
  try {
    yield call(comm.axiosPost, '/member/join', action.payload);
    yield put({ type: JOIN_FINAL_SUCCESS });
    yield call(comm.customAlert, '회원가입이 완료되었습니다!');
    history.push('/login');
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '회원가입 처리 중 오류가 발생했습니다.';
    yield put({ type: JOIN_FINAL_FAILURE, payload: msg });
  }
}

export function* joinWatcher() {
  yield takeLatest(AUTH_CHECK_REQUEST, authCheckSaga);
  yield takeLatest(ID_CHECK_REQUEST,   idCheckSaga);
  yield takeLatest(JOIN_FINAL_REQUEST, joinFinalSaga);
}