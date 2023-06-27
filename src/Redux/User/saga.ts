import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {baseURL} from '../../url';
import {AUTH_LOGIN, GOOGLE_AUTH_LOGIN} from './types';
import {updateUser} from './reducer';
import EncryptedStorage from 'react-native-encrypted-storage';
const signInCall:any=async(auth:any)=>await axios.post(`${baseURL}/auth/login`, {...auth})
const googleSignInCall:any=async(auth:any)=>await axios.post(`${baseURL}/auth/google-login`, {...auth})
const savaInEncryptedStore:any=async(value:any)=>await EncryptedStorage.setItem("_token",JSON.stringify(value))
const clearEncryptedStore:any=async()=>await EncryptedStorage.removeItem("_token")
function* logInWithMail(payload:any):any {
  try { 
    const response: any = yield call(signInCall,payload.user);
    
    savaInEncryptedStore({token:response.data.token,expires:response.data.expires})
    yield put(updateUser({user: response.data.user}));
  } catch (error) {
    console.log("object")
    console.log(error);
  }
}
function* googleSignInWithMail(payload:any):any {
    try { 
      const response: any = yield call(googleSignInCall,{idToken:payload.idToken});
      console.log({token:response.data.token,expires:response.data.expires})
      clearEncryptedStore()
      savaInEncryptedStore({token:response.data.token,expires:response.data.expires})
      yield put(updateUser({user: response.data.user}));
    } catch (error) {
      console.log(error);
    }
  }
function* userSaga() {
  yield all([takeLatest(AUTH_LOGIN, logInWithMail)]);
  yield all([takeLatest(GOOGLE_AUTH_LOGIN, googleSignInWithMail)]);

}
export default userSaga