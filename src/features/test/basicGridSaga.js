import { call, put, takeLatest } from 'redux-saga/effects';
import { comm } from 'src/context/comm.js';
import { 
  BASIC_GRID_LIST_REQUEST, BASIC_GRID_LIST_SUCCESS, BASIC_GRID_LIST_FAILURE 
} from 'src/store/actionTypes';


function* basicGridListSaga(action) {
  try {
    const data = yield call(comm.axiosPost,'/test/getBasicGridList', action.payload);
    yield put({ type: BASIC_GRID_LIST_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.';
    yield put({ type: BASIC_GRID_LIST_FAILURE, payload: msg });
  }
}


export function* basicGridWatcher() {
  yield takeLatest(BASIC_GRID_LIST_REQUEST, basicGridListSaga);
}