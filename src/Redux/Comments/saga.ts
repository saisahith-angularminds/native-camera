import axios from 'axios';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {baseURL} from '../../url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { comments } from './reducer';
import { GET_COMMENTS, COMMENT_LIKE, COMMENT_SAVE } from './types';
const getAllComments:any=async(limit:number)=>await axios.get(`${baseURL}/Comments?limit=${limit}`)
const likeComment:any=async(id:string)=>await axios.post(`${baseURL}/Comments/like/${id}`)
const savaInEncryptedStore:any=async(value:any)=>await EncryptedStorage.setItem("_token",JSON.stringify(value))
const clearEncryptedStore:any=async()=>await EncryptedStorage.removeItem("_token")

function* getComments(payload:any):any{
    try { 
       
        const response: any = yield call(getAllComments,payload.limit);
        yield put(comments({listOfComments: response.data.results}));
    
      } catch (error) {
        console.log("object")
        console.log(error);
      }
}
function* CommentLike(payload:any):any{
          try{
            yield call(likeComment,payload.id)
            // const data=yield select(state=>state)
            // console.log(data.Comments)
            const response: any = yield call(getAllComments,payload.limit);
            yield put(comments({listOfComments: response.data.results}));
          }catch(error){
            console.log(error)
          }
}

function* CommentSaga() {
  yield all([takeLatest(GET_COMMENTS, getComments)]);
  yield all([takeLatest(COMMENT_LIKE, CommentLike)]);

}
export default CommentSaga