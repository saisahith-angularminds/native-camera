import { all, fork } from 'redux-saga/effects';
import userSaga from './User/saga';
import postSaga from './Posts/saga';
export function* rootSaga() {
    yield all([fork(userSaga)]);
    yield all([fork(postSaga)]);
  }