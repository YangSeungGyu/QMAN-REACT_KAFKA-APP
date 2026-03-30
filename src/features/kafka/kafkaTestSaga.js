import { call, put, takeLatest } from 'redux-saga/effects';
import { comm } from 'src/context/comm.js';
import { 
  KAFKA_TEST_SUCCESS, KAFKA_TEST_FAILURE 
  
  ,KAFKA_TEST_REQUEST
} from 'src/store/actionTypes';

function* kafkaTestSaga(action) {
  try {
    const data = yield call(comm.axiosPost,'/kafka/kafkaTestRequest', action.payload);
    yield put({ type: KAFKA_TEST_SUCCESS, payload: data });
  } catch (e) {
    const msg = e.response?.data?.message || e.message || '목록을 불러오는데 실패했습니다.';
    yield put({ type: KAFKA_TEST_FAILURE, payload: msg });
  }
}




export function* kafkaTestWatcher() {
  yield takeLatest(KAFKA_TEST_REQUEST, kafkaTestSaga);

}