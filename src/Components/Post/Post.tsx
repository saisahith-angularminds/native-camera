import {Card, Text} from '@rneui/base';
import {Avatar} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {POST_LIKE, POST_SAVE} from '../../Redux/Posts/types';
import {setPopupComment} from '../../Redux/Comments/reducer';
import {GET_COMMENTS} from '../../Redux/Comments/types';
import Animated, {useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming} from 'react-native-reanimated';
type PostProps = {
  postDetails: any;
  limit: number;
};

export const Post = (props: PostProps) => {
  const {postDetails, limit} = props;
  const {user} = useSelector((state: any) => state.user);
  const {updateId} = useSelector((state: any) => state.comments);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const isLiked: number = postDetails.likes.filter(
    (each: any) => each.id === user._id,
  ).length;
  const isSaved: number = postDetails.saved.filter(
    (each: any) => each.id === user._id,
  ).length;
  const progress = useSharedValue(0);
  const scale = useSharedValue(2);
  const reactStyleReanimated = useAnimatedStyle(() => {
    return {
      opacity:progress.value,
      transform:[{scale:scale.value}]
    };
  });
  useEffect(()=>{
    progress.value=withTiming(1)
    scale.value=withSpring(1)
  },[limit])
  return (

    
    <Animated.View style={reactStyleReanimated}>
      <Card containerStyle={{width: '100%', margin: 0, padding: 0}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Avatar
            size={30}
            rounded
            title={
              postDetails?.createdBy?.name
                ? postDetails?.createdBy?.name.slice(0, 2).toUpperCase()
                : 'Any'
            }
            source={
              postDetails?.createdBy?.image
                ? {uri: postDetails?.createdBy?.image}
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
          <Text style={{alignSelf: 'center', fontSize: 10, fontWeight: '700'}}>
            {postDetails?.createdBy?.name || 'Anonymous'}
          </Text>
        </View>
        {/* <Card.Divider /> */}
        <View
          style={{
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'row',
          }}>
          {postDetails?.image.length > 1 && (
            <>
              {imageIndex > 0 && (
                <TouchableOpacity
                  style={{position: 'absolute', zIndex: 1, alignSelf: 'center'}}
                  onPress={() => setImageIndex(p => p - 1)}>
                  <Icon
                    name="leftcircle"
                    type="antdesign"
                    color="black"
                    size={24}
                  />
                </TouchableOpacity>
              )}
              {postDetails?.image.length - 1 > imageIndex && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    zIndex: 1,
                    alignSelf: 'center',
                    right: 0,
                  }}
                  onPress={() => setImageIndex(p => p + 1)}>
                  <Icon
                    name="rightcircle"
                    type="antdesign"
                    color="black"
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
          <Card.Image
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1,
              resizeMode: 'contain',
            }}
            source={{
              uri: postDetails?.image[imageIndex] || '',
            }}
          />
        </View>
        <Text style={{marginBottom: 10}}>{postDetails?.caption}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '30%',
            }}>
            <TouchableOpacity
              onPress={() =>
                dispatch({type: POST_LIKE, id: postDetails._id, limit: limit})
              }>
              <Icon
                name={isLiked ? 'heart' : 'hearto'}
                type="antdesign"
                color={isLiked ? 'red' : 'black'}
                size={24}
              />
              {postDetails.likes.length ? (
                <Text>
                  {postDetails.likes.length}
                  {postDetails.likes.length > 1 ? ' likes' : ' like'}
                </Text>
              ) : (
                ''
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(setPopupComment({updateId: postDetails._id}));
                dispatch({type: GET_COMMENTS, id: postDetails._id});
              }}>
              <Icon name="message1" type="antdesign" color="black" size={24} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              dispatch({type: POST_SAVE, id: postDetails._id, limit: limit})
            }>
            <Icon
              name={isSaved ? 'bookmark' : 'bookmark-border'}
              type="materialicons"
              color="black"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </Animated.View>
  );
};
