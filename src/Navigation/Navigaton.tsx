import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameraModal} from './StackNavigation';
import {FirstPage} from '../Pages/FirstPage';
import {HomePage} from '../Pages/HomePage';
import {Image} from '@rneui/base';
import {SignIn} from '../Pages/SignIn';
import { useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { Icon, Button } from 'react-native-elements';

export type NavigationProps = {};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export const Navigation = (props: NavigationProps) => {
  const [tokened, setTokened] = useState<any>();
  const [show, setShow] = useState<boolean>(false);
  const {user,token}=useSelector((state:any)=>state.user)
  console.log("store==>",user)
  useEffect(() => {
    
    getToken();
  }, []);
  const getToken = async () => {
    // await EncryptedStorage.clear()
    return await EncryptedStorage.getItem('_token').then((response: any) => {
      const tokenData = JSON.parse(response || 'null');
      setTokened(tokenData?.token||null);
      axios.defaults.headers.common={"Authorization":tokenData?.token?'Bearer ' + tokenData?.token:null}
      
      console.log(tokenData?.token);
      // console.log(new Date(JSON.parse(response || 'null').expires).getTime()-new Date().getTime())
    });
  };
  const headers = {
    headerLeft: () => (
      <TouchableOpacity onPress={() => setShow(true)}>
        <Icon
          name="camera-alt"
          type="metrialicons"
          size={30}
          style={{marginLeft: 10}}
        />
      </TouchableOpacity>
    ),
    headerRight: () => <Icon name="send" size={30} style={{marginRight: 10}} />,
  };
  return (
    <>
      
        <NavigationContainer>
          <Tab.Navigator>
            {!token?.token&&!user?.id ?(
              <Tab.Group>
                <Tab.Screen
                  name="signIn"
                  component={SignIn}
                  options={{
                    headerShown: false,
                    title: 'signIn',
                    headerTitleAlign: 'center',
                    tabBarStyle: {
                      display: 'none',
                    },
                    tabBarButton: () => null,
                  }}
                />
              </Tab.Group>
            ) : (
              <Tab.Group
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
                    tabBarIcon:()=>
                    <Icon name="home" type="materialicons" color="black" size={32} />,
                    tabBarLabel:() => {return null},
                    headerShown: true,
                    title: 'Home',
                    headerTitleAlign: 'center',
                  }}
                />
              </Tab.Group>
            )}
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
};
