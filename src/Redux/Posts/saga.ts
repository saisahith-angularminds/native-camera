import axios from 'axios';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {baseURL} from '../../url';
import EncryptedStorage from 'react-native-encrypted-storage';
import { posts } from './reducer';
import { GET_POSTS, POST_LIKE, POST_SAVE } from './types';
const getAllPosts:any=async(limit:number)=>await axios.get(`${baseURL}/posts?limit=${limit}`)
const likePost:any=async(id:string)=>await axios.post(`${baseURL}/posts/like/${id}`)
const savePost:any=async(id:string)=>await axios.post(`${baseURL}/posts/save/${id}`)
const savaInEncryptedStore:any=async(value:any)=>await EncryptedStorage.setItem("_token",JSON.stringify(value))
const clearEncryptedStore:any=async()=>await EncryptedStorage.removeItem("_token")

function* getPosts(payload:any):any{
    try { 
       
        const response: any = yield call(getAllPosts,payload.limit);
        yield put(posts({listOfPosts: response.data.results,totalPosts:response.data.totalResults}));
    
      } catch (error) {
        console.log("object")
        console.log(error);
      }
}
function* postLike(payload:any):any{
          try{
            yield call(likePost,payload.id)
            // const data=yield select(state=>state)
            // console.log(data.posts)
            const response: any = yield call(getAllPosts,payload.limit);
            yield put(posts({listOfPosts: response.data.results,totalPosts:response.data.totalResults}));
          }catch(error){
            console.log(error)
          }
}
function* postSave(payload:any):any{
  try{
    yield call(savePost,payload.id)
    // const data=yield select(state=>state)
    // console.log(data.posts)
    const response: any = yield call(getAllPosts,payload.limit);
    yield put(posts({listOfPosts: response.data.results,totalPosts:response.data.totalResults}));
  }catch(error){
    console.log(error)
  }
}
function* postSaga() {
  yield all([takeLatest(GET_POSTS, getPosts)]);
  yield all([takeLatest(POST_LIKE, postLike)]);
  yield all([takeLatest(POST_SAVE,postSave)])

}
export default postSaga