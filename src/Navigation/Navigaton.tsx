import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
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

export type NavigationProps = {}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const Navigation = (props: NavigationProps) => {
    const [show,setShow]=useState<boolean>(false)
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
    
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerTitle: () => (
              <Image
                source={require("../Images/PNG/Instagram-title.png")}
                style={[{width: 150, height: 40,marginTop:7}]}
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
        </Tab.Navigator>
        <CameraModal
          show={show}
          close={() => {
            setShow(false);
          }}
        />
      </NavigationContainer>
    </>
  );
}

