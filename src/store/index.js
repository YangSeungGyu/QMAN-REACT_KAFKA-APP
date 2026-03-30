import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from 'src/features/auth/authSlice';
import {boardListReducer,boardDetailReducer} from 'src/features/board/boardSlice';
import { authCheckReducer, idCheckReducer, joinFinalReducer } from 'src/features/join/joinSlice';
import {commonReducer } from 'src/features/common/commonSlice';
import {pageGridListReducer} from 'src/features/test/pageGridSlice';
import {basicGridListReducer} from 'src/features/test/basicGridSlice';
import {kafkaTestReducer} from 'src/features/kafka/kafkaTestSlice';

import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    common: commonReducer,
    auth:      authReducer,
    boardList:     boardListReducer,
    boardDetail:     boardDetailReducer,
    authCheck: authCheckReducer,
    idCheck:   idCheckReducer,
    joinFinal:  joinFinalReducer,
    pageGrid: pageGridListReducer,
    basicGrid: basicGridListReducer,
    kafkaTestGrid: kafkaTestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false })
      .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
