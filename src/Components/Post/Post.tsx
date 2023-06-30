import {Card, Text} from '@rneui/base';
import {Avatar} from '@rneui/themed';
import React from 'react';
import {TouchableHighlight, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Icon, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {POST_LIKE, POST_SAVE} from '../../Redux/Posts/types';
type PostProps = {
  postDetails: any;
  limit: number;
};

export const Post = (props: PostProps) => {
  const {postDetails, limit} = props;
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const isLiked: number = postDetails.likes.filter(
    (each: any) => each.id === user._id,
  ).length;
  const isSaved: number = postDetails.saved.filter(
    (each: any) => each.id === user._id,
  ).length;
  return (
    <View>
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
        <Card.Image
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
          source={{
            uri: postDetails?.image[0] || '',
          }}
        />
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
            <TouchableOpacity>
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
    </View>
  );
};