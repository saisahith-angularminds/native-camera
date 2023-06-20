import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'

type SignInProps = {}

export const SignIn = (props: SignInProps) => {
  return (
    <View>
      <Input placeholder='Email'/>
      <Input placeholder='Password'/>

    </View>
  )
}
