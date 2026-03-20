import { all } from 'redux-saga/effects';
import { authWatcher } from 'src/features/auth/authSaga';
import { boardWatcher } from 'src/features/board/boardSaga';
import { joinWatcher } from 'src/features/join/joinSaga';
import { commonWatcher } from 'src/features/common/commonSaga';

export function* rootSaga() {
  yield all([
    commonWatcher(),
    authWatcher(),
    boardWatcher(),
    joinWatcher(),
  ]);
}
