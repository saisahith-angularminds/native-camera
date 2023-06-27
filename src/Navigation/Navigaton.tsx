import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'
import {  CameraComponent } from '../Components/Camera'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CameraModal } from './StackNavigation'
import { FirstPage } from '../Pages/FirstPage'
import { HomePage } from '../Pages/HomePage'
import { Image } from '@rneui/base'
import { SignIn } from '../Pages/SignIn'
import { Provider } from 'react-redux'
import store from '../Redux/store'
import EncryptedStorage from 'react-native-encrypted-storage'

export type NavigationProps = {}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const Navigation = (props: NavigationProps) => {
  const [token,setToken]=useState<any>()
    const [show,setShow]=useState<boolean>(false)
    useEffect( ()=>{
     
        getToken()
    
    },[])
    const getToken = async () => {
      return await EncryptedStorage.getItem('_token').then((response:any) => {
        const tokenData=JSON.parse(response || 'null');
        setToken(tokenData.token)
        // console.log(new Date(JSON.parse(response || 'null').expires).getTime()-new Date().getTime())
      });
    };
    const headers={
      headerLeft: () => (
        <TouchableOpacity onPress={()=>setShow(true)}>

        <Icon name="camera-alt" type="metrialicons" size={30} style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ),
      headerRight:()=>(
        <Icon name="send"  size={30} style={{ marginRight: 10 }}/>
      )
        
      }
    console.log(token)
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerTitle: () => (
                <Image
                  source={require('../Images/PNG/Instagram-title.png')}
                  style={[{width: 150, height: 40, marginTop: 7}]}
                />
              ),
              ...headers,
            }}>
            <Tab.Screen
              name="Tab"
              component={FirstPage}
              options={{
                headerShown: false,
                title: 'Tab',
                headerTitleAlign: 'center',
                tabBarStyle: {
                  display: 'none',
                },
                tabBarButton: () => null,
              }}
            />
            <Tab.Screen
              name="Home"
              component={HomePage}
              options={{
                headerShown: true,
                title: 'Home',
                headerTitleAlign: 'center',
              }}
            />
            <Tab.Screen
              name="signIn"
              component={SignIn}
              options={{
                headerShown: true,
                title: 'sIgnIn',
                headerTitleAlign: 'center',
              }}
            />
          </Tab.Navigator>
          <CameraModal
            show={show}
            close={() => {
              setShow(false);
            }}
          />
        </NavigationContainer>
      </Provider>
    </>
  );
}

