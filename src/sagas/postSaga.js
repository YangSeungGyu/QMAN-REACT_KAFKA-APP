import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsFailure } from '../features/post/postSlice';
import { fetchPostsAPI } from '@/features/post/postApi';

function* fetchPostsWorker(action) {
  try {
    const response = yield call(fetchPostsAPI, action.payload); // fetchPostsAPI로 교체
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

export function* postSaga() {
  yield takeLatest(fetchPostsRequest.type, fetchPostsWorker);
}