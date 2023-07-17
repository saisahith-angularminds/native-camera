import { Dialog, Divider, Input, Text } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupComment } from '../../Redux/Comments/reducer'
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native'
import { commentStyles } from './CommentsStyles'
import { Icon } from 'react-native-elements'
import { GET_COMMENTS, POST_COMMENTS, POST_REPLY } from '../../Redux/Comments/types'
import { CommentBox } from '../CommentBox'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = {}

export const Comments = (props: Props) => {
  const {listOfComments,isPopup,updateId}=useSelector((state:any)=>state.comments)
  const [comment,setComment]=useState<string>("")
  const [replyId,setReplyId]=useState<string>("")
  const dispatch=useDispatch()
  console.log("updateId",updateId)
  const postComment=()=>{
    dispatch({
      type: POST_COMMENTS,
      id: updateId,
      body: {comment: comment},
    }),
    setComment("")
  }
  const postReply=()=>{
    dispatch({
      type: POST_REPLY,
      id: updateId,
      replyId:replyId,
      body: {comment: comment},
    }),
    setComment("")
    // setReplyId("")
  }
  const onSetReply=(id:string)=>{
    setReplyId(id)
  }
  
  
  const bottomSheet=useSharedValue(-200)
  const bottomSheetAnimation=useAnimatedStyle(()=>{
    return{
      transform:[{translateY:bottomSheet.value}]
    }
  })

  useEffect(()=>{
    if(isPopup)
    bottomSheet.value=withTiming(0,{duration:5000})
  },[isPopup])
  return (
    <Modal
      visible={isPopup}
      animationType="slide"
      transparent
      onRequestClose={() => dispatch(setPopupComment({updateId: ''}))}>
        <View style={commentStyles.container}>

        <View style={[commentStyles.dialog,]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={commentStyles.dialogText}>Comments</Text>
            <TouchableOpacity
              onPress={() => dispatch(setPopupComment({updateId: ''}))}>
              <Icon name="close" type="antdesign" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <Divider />
          <ScrollView>
            <View style={{paddingBottom:"20%"}}>
              {listOfComments?.map((each: any) => (
                <CommentBox
                comment={each}
                key={each._id}
                  setReplyId={onSetReply}
                />
                ))}
            </View>
          </ScrollView>
          <View
            style={{
              position: 'absolute',
              height:"10%",
              bottom:"5%",
              
              alignSelf: 'center',
              padding: 0,
              width: '100%',
            }}>
            <Input
              onChangeText={(text: string) => setComment(text)}
              containerStyle={{paddingHorizontal: 0}}
              placeholder={replyId ? 'Reply' : 'Comment'}
              value={comment}
              inputContainerStyle={{
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                borderWidth:0,
                height:"100%",
                borderColor: '#87CEEB',
              borderTopWidth: 2,
              width: '100%',
              backgroundColor: '#ffffff',
              padding: 10,
            }}
            rightIcon={{
              type: 'antdesign',
              name: 'caretright',
              color: '#87CEEB',
              onPress: replyId ? postReply : postComment,
            }}
            />
          </View>
        </View>
            </View>
      </Modal>
  );
}