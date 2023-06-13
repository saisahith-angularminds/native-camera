import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/themed'
import {  CameraComponent } from '../Components/Camera'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { CameraModal } from './StackNavigation'

export type NavigatonProps = {}
const Home=()=><View><Text style={{color:"#000000"}}>Home</Text></View>
const About=()=><View><Text style={{color:"#000000"}}>About</Text></View>

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const Navigaton = (props: NavigatonProps) => {
    const [show,setShow]=useState<boolean>(false)
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              title: 'Home',
              headerTitleAlign: 'center',
              headerLeft: ({tintColor,}) => (
                <TouchableOpacity onPress={() => setShow(!show)}>
                   <Icon
                  name="camera-alt"
                  type="metrialicons"
                  size={50} color={tintColor}
                />
                </TouchableOpacity>
              ),
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="home"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={About}
            options={{
              title: '',
              headerShown: true,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <TouchableOpacity onPress={() => setShow(!show)}>
                  <Icon
                  name="camera-alt"
                  type="metrialicons"
                  size={70} color="#fff"
                />
                </TouchableOpacity>
              ),
              tabBarIcon: ({color, size}) => (
                <Icon   name="trophy"
                type="evilicon" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
        <CameraModal show={show} close={() => {setShow(false)}} />
      </NavigationContainer>
    </>
  );
}

