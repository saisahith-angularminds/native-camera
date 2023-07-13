import { Avatar, Dialog, Divider, Text } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupComment } from '../../Redux/Comments/reducer'
import { Modal, TouchableOpacity, View } from 'react-native'
import { CommentBoxStyles } from './CommentBoxStyles'
import { Icon } from 'react-native-elements'
import { COMMENT_LIKE, GET_COMMENTS } from '../../Redux/Comments/types'

type CommentBoxProps = {
  comment:any;
  setReplyId?:((id:string)=>void)|any
}

export const CommentBox = (props: CommentBoxProps) => {
  const {comment:{_id,comment,createdBy,updatedAt,reply,likes},setReplyId}=props
  const [isReply,setIsReply]=useState<boolean>(false)
  const {user} = useSelector((state: any) => state.user);
  console.log(props.comment.reply)

  const dispatch=useDispatch()
  const isLiked: number = likes.filter(
    (each: any) => each.id === user._id
  ).length;
  const onReply=()=>{setReplyId(_id),setIsReply(true)}
  console.log(isLiked)
  return (
   <View>
    <View style={{display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>

          <Avatar
            size={35}
            rounded
            title={
              createdBy?.name
                ? createdBy?.name.slice(0, 2).toUpperCase()
                : 'Any'
              }
              source={
                createdBy?.image
                ? {uri:createdBy?.image}
                : {uri: null}
            }
            containerStyle={{
              backgroundColor: 'grey',
              position: 'relative',
              margin: 5,
            }}
            titleStyle={{position: 'absolute', zIndex: -1, alignSelf: 'center'}}
            avatarStyle={{position: 'absolute'}}
            />
          <View>

          <Text style={{ fontSize: 13, fontWeight: '700'}}>
            {createdBy?.name || 'Anonymous'}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '600'}}>{comment}</Text>
          </View>
            </View>
          <View style={{alignSelf:"center"}}>
          <TouchableOpacity
         
              onPress={() =>
                dispatch({type: COMMENT_LIKE, id: _id})
              }>
              <Icon
                name={isLiked ? 'heart' : 'hearto'}
                type="antdesign"
                color={isLiked ? 'red' : 'black'}
                size={24}
              />
              {likes.length ? (
                <Text>
                  {likes.length}
                 
                </Text>
              ) : (
                ''
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",width:"40%",paddingLeft:2}}>

        {reply.length?isReply?<TouchableOpacity onPress={()=>setIsReply(p=>!p)}><Text>Hide reply's</Text></TouchableOpacity>:<TouchableOpacity onPress={()=>setIsReply(p=>!p)}><Text>See reply's</Text></TouchableOpacity>:<Text style={{display:"none"}}/>}
        <TouchableOpacity onPress={onReply}><Text>Reply</Text></TouchableOpacity>
        </View>
       {
         isReply&&(reply.length?reply.map((each:any)=> <CommentBox comment={each.id} setReplyId={setReplyId}/>):<View><Text>No Reply's</Text></View>)
        }
   </View>
  )
}