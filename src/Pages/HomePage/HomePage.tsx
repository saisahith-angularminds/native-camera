import {Text} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Post} from '../../Components/Post/Post';
import {useDispatch, useSelector} from 'react-redux';
import {GET_POSTS} from '../../Redux/Posts/types';
import Animated, {useAnimatedStyle, useSharedValue, withSequence, withTiming} from 'react-native-reanimated';

type Props = {};

export const HomePage = (props: Props) => {
  const [limit, setLimit] = useState<number>(5);
  const dispatch = useDispatch();
  const {listOfPosts, totalPosts} = useSelector((state: any) => state.posts);

  useEffect(() => {
    dispatch({type: GET_POSTS, limit: limit});
  }, [limit]);
  const onEndScroll = () => {
    if (!(listOfPosts.length === totalPosts)) {
      setLimit(prev => prev + 1);
    }
  };

  const process = useSharedValue(0);
  const processAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: process.value,
    };
  });

  useEffect(()=>{
    process.value=withSequence(
      withTiming(0,{duration:1000}),
      withTiming(1,{duration:5000}))
  },[limit])

  return (
    <View>
      <ScrollView onMomentumScrollEnd={onEndScroll}>
        <Animated.View >
          {listOfPosts.map((each: any) => {
            return <Post postDetails={each} limit={limit} key={each._id} />;
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};
