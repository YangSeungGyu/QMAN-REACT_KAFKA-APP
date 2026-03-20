import { all } from 'redux-saga/effects';
import { authWatcher } from 'src/features/auth/authSaga';
import { boardWatcher } from 'src/features/board/boardSaga';
import { joinWatcher } from 'src/features/join/joinSaga';
import { pageGridWatcher } from 'src/features/test/pageGridSaga';
import { basicGridWatcher } from 'src/features/test/basicGridSaga';
import { commonWatcher } from 'src/features/common/commonSaga';

export function* rootSaga() {
  yield all([
    commonWatcher(),
    authWatcher(),
    boardWatcher(),
    joinWatcher(),
    pageGridWatcher(),
    basicGridWatcher(),
  ]);
}
