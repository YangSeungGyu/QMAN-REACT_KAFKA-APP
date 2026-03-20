import { call, put, takeLatest } from 'redux-saga/effects';
import { comm } from 'src/context/comm.js';
import { 
  BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS, BOARD_LIST_FAILURE 
  ,BOARD_DETAIL_REQUEST, BOARD_DETAIL_SUCCESS, BOARD_DETAIL_FAILURE 
} from 'src/store/actionTypes';

function* boardListSaga(action) {
  try {
    const data = yield call(comm.axiosPost,'/board/getBoardList', action.payload);
    yield put({ type: BOARD_LIST_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.';
    yield put({ type: BOARD_LIST_FAILURE, payload: msg });
  }
}

function* boardDetailSaga(action) {
  try {
    const data = yield call(comm.axiosPost,'/board/getBoardDetail', action.payload);
    yield put({ type: BOARD_DETAIL_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '게시물을 불러오는데 실패했습니다.';
    yield put({ type: BOARD_DETAIL_FAILURE, payload: msg });
  }
}

export function* boardWatcher() {
  yield takeLatest(BOARD_LIST_REQUEST, boardListSaga);
  yield takeLatest(BOARD_DETAIL_REQUEST, boardDetailSaga);
}