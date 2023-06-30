import { Text } from '@rneui/base'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Post } from '../../Components/Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { GET_POSTS } from '../../Redux/Posts/types'

type Props = {}

export const HomePage = (props: Props) => {
  const [limit, setLimit] = useState<number>(5);
  const dispatch=useDispatch()
  const {listOfPosts,totalPosts}=useSelector((state:any)=>state.posts)
 
  useEffect(()=>{
    dispatch({type:GET_POSTS,limit:limit})
  },[limit])
  const onEndScroll = () => {
    if (!(listOfPosts.length === totalPosts)){
      setLimit(prev => prev + 1);
    } 
  };
  return (
    <View>
      <ScrollView onMomentumScrollEnd={onEndScroll}>

      {listOfPosts.map((each:any)=>{
        return <Post postDetails={each} limit={limit} key={each._id}/>
      })}
      </ScrollView>
    </View>
  );
}
