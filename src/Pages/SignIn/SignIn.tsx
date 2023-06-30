import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import { Image, Input} from '@rneui/base';
import {SignInStyles as Styles} from './SignInStyles';
import {Button, Text} from '@rneui/themed';
import {
  GoogleSignin,GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AUTH_LOGIN, AUTH_SIGNUP, GOOGLE_AUTH_LOGIN } from '../../Redux/User/types';
import { useNavigation } from '@react-navigation/native';
type SignInProps = {};

export const SignIn = (props: SignInProps) => {
  const dispatch=useDispatch()
  const [signUp, setSignUp] = useState<boolean>(false);
  const [user,setUser]=useState<any>()
  const navigation:any=useNavigation()
  useEffect(()=>{

    GoogleSignin.configure({
      webClientId:
      '854656644231-dee72lblph9ial537pe2v4pjbuhsie6p.apps.googleusercontent.com',
      offlineAccess:true
      
    });
  },[])
  //=======> signUp or SignIn with email <===============
  const signInOrSignUp = () =>
    signUp
      ? dispatch({
          type: AUTH_SIGNUP,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
          },
        })
      : dispatch({
          type: AUTH_LOGIN,
          user: {email: user.email, password: user.password},
        });
  //==============> googlePass is a function which give google profile but we just need "idToken" <=================
  const googlePass = async() => {
    try{
      await GoogleSignin.hasPlayServices()
      const userSignIn = await GoogleSignin.signIn()
      dispatch({type:GOOGLE_AUTH_LOGIN,user:{idToken:userSignIn.idToken}})
    }catch(e){
      console.log(e)
    }       
  };
  return (
    <View style={Styles.container}>
      <Image
        source={require('../../Images/PNG/instagram.png')}
        style={Styles.imageView}
      />
      <View>
        {/* we need "First Name" and "Last Name" for "Sign up" only "signUp" state decides input fields*/} 
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
        {}
        <Button
          title={signUp ? 'Sign Up.' : 'Sign In'}
          containerStyle={Styles.buttonContainer}
          onPress={signInOrSignUp}
        />
        <Text style={{color:"black",textAlign:'center'}} h4>Or</Text>
        <Button
          title={`Google`}
          icon={ <AntDesign
            name="google"
            size={30}
            style={{marginRight: 10}}
          />} 
          containerStyle={Styles.buttonContainer}
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
