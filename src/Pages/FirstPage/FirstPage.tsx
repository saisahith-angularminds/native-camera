import { View, Text, TouchableOpacity } from 'react-native'
import { FirstPageStyles as Styles } from './FirstPageStyles'
import React from 'react'
import { Image } from '@rneui/base'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native'

type Props = {}

export const FirstPage = (props: Props) => {
  const route=useRoute()
  const navigation:any=useNavigation()
  return (
    <LinearGradient start={{ x: 0.1, y: 0.5 }} locations={[0,0.5]}colors={['#833AB4', '#5B51D8']} style={Styles.pageContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
        <Image
          source={require('../../Images/PNG/instagram.png')}
          style={[{width: 150, height: 150}]}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}
