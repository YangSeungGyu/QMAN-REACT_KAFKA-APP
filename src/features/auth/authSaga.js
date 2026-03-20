import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'src/store/actionTypes';
import { comm } from 'src/context/comm.js';
import { history } from 'src/history';

function* loginSaga(action) {
  try {
    const { id, pw } = action.payload;
  const formData = new FormData();
  formData.append('username', id);
  formData.append('password', pw);

    const data = yield call(comm.axiosPostForm, '/login', formData);

    localStorage.setItem('user', JSON.stringify(data));
    yield put({ type: LOGIN_SUCCESS, payload: data });
    yield call(comm.customAlert, data.nm + '님 반갑습니다!');
    history.push('/');

  } catch (e) {
    const msg = e.response?.data?.message || e.message || '로그인에 실패했습니다.';
    yield put({ type: LOGIN_FAILURE, payload: msg });
  }
}

export function* authWatcher() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}