import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image, Input} from '@rneui/base';
import {SignInStyles as Styles} from './SignInStyles';
import {Button} from '@rneui/themed';
import {
  GoogleSignin,GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { AUTH_LOGIN, GOOGLE_AUTH_LOGIN } from '../../Redux/User/types';
type SignInProps = {};

export const SignIn = (props: SignInProps) => {
  const dispatch=useDispatch()
  const [signUp, setSignUp] = useState<boolean>(false);
  const [user,setUser]=useState<any>()
  useEffect(()=>{

    GoogleSignin.configure({
      webClientId:
      '854656644231-dee72lblph9ial537pe2v4pjbuhsie6p.apps.googleusercontent.com',
      offlineAccess:true
      
    });
  },[])
  const googlePass = async() => {
    try{
      await GoogleSignin.hasPlayServices()
      
      const userSignIn = await GoogleSignin.signIn()
      dispatch({type:GOOGLE_AUTH_LOGIN,idToken:userSignIn.idToken})
      // console.log(userSignIn)
    }catch(e){
      console.log(e)
    }
      //  console.log(userSignIn)
            
  };
  return (
    <View style={Styles.container}>
      <Image
        source={require('../../Images/PNG/instagram.png')}
        style={Styles.imageView}
      />
      <View>
        {signUp && (
          <View>
            <Input
              placeholder="First Name"
              inputContainerStyle={Styles.inputContainer}
              onChangeText={(text)=>setUser((p:any)=>({...p,firstName:text}))}
            />
            <Input
              placeholder="Last Name"
              inputContainerStyle={Styles.inputContainer}
              onChangeText={(text)=>setUser((p:any)=>({...p,lastName:text}))}
            />
          </View>
        )}
        <Input
          placeholder="Email"
          inputContainerStyle={Styles.inputContainer}
          onChangeText={(text)=>setUser((p:any)=>({...p,email:text}))}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          
          inputContainerStyle={Styles.inputContainer}
          onChangeText={(text)=>setUser((p:any)=>({...p,password:text}))}

        />
        <Button
          title={signUp ? 'Sign Up.' : 'Sign In'}
          containerStyle={Styles.buttonContainer}
          onPress={()=>dispatch({type:AUTH_LOGIN,user:{email:user.email,password:user.password}})}

        />
        <GoogleSigninButton
          style={Styles.buttonContainer}
          onPress={googlePass}
        />
      </View>
      <Text style={{color: '#AEA6A6'}}>
        Don’t have an account?{' '}
        <Text style={{color: '#3797EF'}} onPress={() => setSignUp(p => !p)}>
          {signUp ? 'Sign In.' : 'Sign Up'}
        </Text>
      </Text>
    </View>
  );
};
