import { Avatar, Dialog, Divider, Text } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupComment } from '../../Redux/Comments/reducer'
import { Modal, TouchableOpacity, View } from 'react-native'
import { CommentBoxStyles } from './CommentBoxStyles'
import { Icon } from 'react-native-elements'
import { GET_COMMENTS } from '../../Redux/Comments/types'

type CommentBoxProps = {
  comment:any;
  setReplyId?:((id:string)=>void)|any
}

export const CommentBox = (props: CommentBoxProps) => {
  const {comment:{_id,comment,createdBy,updatedAt,reply},setReplyId}=props
  const [isReply,setIsReply]=useState<boolean>(false)
  console.log(props.comment.reply)
  // const {isPopup,updateId}=useSelector((state:any)=>state.comments)
  // const dispatch=useDispatch()
  const onReply=()=>{setReplyId(_id)}
  console.log(comment)
  return (
   <View>
    <View style={{display: 'flex', flexDirection: 'row',justifyContent:"space-between"}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>

          <Avatar
            size={45}
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
          <Text>{comment}</Text>
          </View>
            </View>
          <View style={{alignSelf:"center"}}>
          <Icon
                name={ 'hearto'}
                type="antdesign"
                color={'black'}
                size={24}
              />
          </View>
        </View>
        {reply.length?<TouchableOpacity onPress={()=>setIsReply(p=>!p)}><Text>See all reply's</Text></TouchableOpacity>:null}
        <TouchableOpacity onPress={onReply}><Text>Reply</Text></TouchableOpacity>
       {
       isReply&&(reply.length?reply.map((each:any)=> <CommentBox comment={each.id}/>):<View><Text>No Reply's</Text></View>)
       }
   </View>
  )
}