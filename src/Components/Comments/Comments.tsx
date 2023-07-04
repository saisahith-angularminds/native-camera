import { Dialog, Divider, Text } from '@rneui/themed'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPopupComment } from '../../Redux/Comments/reducer'
import { Modal, TouchableOpacity, View } from 'react-native'
import { commentStyles } from './CommentsStyles'
import { Icon } from 'react-native-elements'

type Props = {}

export const Comments = (props: Props) => {
  const {isPopup,updateId}=useSelector((state:any)=>state.comments)
  const dispatch=useDispatch()
  return (
    <Modal visible={isPopup} animationType="none" transparent
    onRequestClose={()=>dispatch(setPopupComment({updateId:""}))} >
        <View style={commentStyles.container}>
        <View style={commentStyles.dialog}>
          <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>

          <Text style={commentStyles.dialogText}>Comments</Text>
          <TouchableOpacity onPress={()=>dispatch(setPopupComment({updateId:""}))}>

          <Icon name="close" type='antdesign' size={24} color="#000000" />
          </TouchableOpacity>
          </View>
          <Divider/>
        </View>
      </View>


    </Modal>
  )
}