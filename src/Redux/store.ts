import { configureStore } from "@reduxjs/toolkit";
import {TodoReducer} from "./reducer";
import { UserReducer } from "./User/reducer";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
const sagaMiddleWare=createSagaMiddleware()
const middleware=[sagaMiddleWare]
const store = configureStore({
  reducer: {
    todo: TodoReducer,
    user:UserReducer
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(middleware)
});
sagaMiddleWare.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>;
export default store;
