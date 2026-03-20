import { call, put, takeLatest } from 'redux-saga/effects';
import { comm } from 'src/context/comm.js';
import { 
  PAGE_GRID_LIST_REQUEST, PAGE_GRID_LIST_SUCCESS, PAGE_GRID_LIST_FAILURE 
} from 'src/store/actionTypes';


function* pageGridListSaga(action) {
  try {
    const data = yield call(comm.axiosPost,'/test/getPageGridList', action.payload);
    yield put({ type: PAGE_GRID_LIST_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.';
    yield put({ type: PAGE_GRID_LIST_FAILURE, payload: msg });
  }
}


export function* pageGridWatcher() {
  yield takeLatest(PAGE_GRID_LIST_REQUEST, pageGridListSaga);
}