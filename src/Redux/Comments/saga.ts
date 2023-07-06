import axios from 'axios';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {baseURL} from '../../url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { comments } from './reducer';
import { GET_COMMENTS, COMMENT_LIKE, COMMENT_SAVE, POST_COMMENTS, POST_REPLY } from './types';
const getAllComments:any=async(postId:string)=>await axios.get(`${baseURL}/comments/post/${postId}`)   
const commentPost:any=async(postId:string,body:any)=>await axios.post(`${baseURL}/comments/post/${postId}`,body)   
const replyPost:any=async(postId:string,commentId:string,body:any)=>await axios.post(`${baseURL}/comments/comment/${postId}/${commentId}`,body)   
const likeComment:any=async(id:string)=>await axios.post(`${baseURL}/comments/comment/like/${id}`)
// const savaInEncryptedStore:any=async(value:any)=>await EncryptedStorage.setItem("_token",JSON.stringify(value))
// const clearEncryptedStore:any=async()=>await EncryptedStorage.removeItem("_token")

function* getComments(payload:any):any{
    try { 
       
        const response: any = yield call(getAllComments,payload.id);
       
        yield put(comments({listOfComments: response.data.comments}));
    
      } catch (error) {
        console.log("object")
        console.log(error);
      }
}
function* postComments(payload:any):any{
  try { 
     console.log(payload.id,payload.body)
      const resp=yield call(commentPost,payload.id,payload.body);
  
console.log(resp.data)
      const response: any = yield call(getAllComments,payload.id);
       console.log(response)
      yield put(comments({listOfComments: response.data.comments}));
  
    } catch (error) {
      console.log("object")
      console.log(error);
    }
}
function* postReply(payload:any):any{
  try { 
     console.log(payload.id,payload.body)
      const resp=yield call(replyPost,payload.id,payload.replyId,payload.body);
  
console.log(resp.data)
      const response: any = yield call(getAllComments,payload.id);
       console.log(response)
      yield put(comments({listOfComments: response.data.comments}));
  
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

function* commentSaga() {
  yield all([takeLatest(GET_COMMENTS, getComments)]);
  yield all([takeLatest(COMMENT_LIKE, CommentLike)]);
  yield all([takeLatest(POST_COMMENTS, postComments)]);
  yield all([takeLatest(POST_REPLY, postReply)]);

}
export default commentSaga