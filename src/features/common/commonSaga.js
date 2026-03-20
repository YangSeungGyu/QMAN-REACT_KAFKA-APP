import { call, put, takeLatest } from 'redux-saga/effects';
import { comm } from 'src/context/comm.js';
import { 
  COMMON_REQUEST, COMMON_SUCCESS, COMMON_FAILURE
} from 'src/store/actionTypes';

function* commonSaga() {
  try {
    const data = yield call(comm.axiosPost,'/common/getCommonData', {});
    yield put({ type: COMMON_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '공통 데이터를 불러오는데 실패했습니다.';
    yield put({ type: COMMON_FAILURE, payload: msg });
  }
}


export function* commonWatcher() {
  yield takeLatest(COMMON_REQUEST, commonSaga);
}