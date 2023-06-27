import { all, fork } from 'redux-saga/effects';
import userSaga from './User/saga';
export function* rootSaga() {
    yield all([fork(userSaga)]);
  }