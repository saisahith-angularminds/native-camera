import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {ReAnimatedCameraStyles as Styles} from './ReAnimatedCameraStyles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Button, Icon, Image } from '@rneui/base';
import Reanimated from "react-native-reanimated"
const ReanimatedCamera=Reanimated.createAnimatedComponent(Camera)
Reanimated.addWhitelistedNativeProps({
  zoom: true,
});

export const ReAnimatedCameraComponent = () => {
  const camera: any = useRef(null);
  const devices = useCameraDevices();
  
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState(''); 
  const [rotate, setRotate] = useState(false); 
  const device = rotate?devices.front:devices.back;
  async function getPermission() {
    const permission = await Camera.requestCameraPermission();
    console.log(`Camera perdission status: ${permission}`);
    setShowCamera(true)

    if (permission === 'denied') await Linking.openSettings();
  }
  useEffect(() => {
    
    getPermission();
  }, []);

  const capturePhoto = async () => {
    console.log(camera.null)
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };
  if (device == null)
    return (
      <View>
        <Text>Loading.........</Text>
      </View>
    );

  return (
    <>
      {showCamera ? (
        <Reanimated.View style={Styles.container}>
          <ReanimatedCamera
            photo={true}
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
          />
          
          <TouchableOpacity style={Styles.capture} onPress={capturePhoto}>
            <View style={Styles.fillCapture}></View>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.cameraRotator} onPress={()=>setRotate(prev=>!prev)}>
          <Icon
                  name="refresh"
                  type="evilicon"
                  size={60} color="#fff"
                  />
          </TouchableOpacity>
          
        </Reanimated.View>
      ) : (
        <View style={{flex: 1, width: '100%', height: '100%'}}>
          <Image
            source={{uri: 'file://' + imageSource}}
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          />
          <TouchableOpacity
            style={ {...Styles.tickMark,position: 'absolute',
            top: 600,
            bottom: 0,
           }}
            onPress={() => {setShowCamera(true);setImageSource("")}}>
             <Icon
                  name="done"
                  type="metrialicons"
                  size={70} color="#fff"
                />
          </TouchableOpacity>
          <TouchableOpacity
            style={ {...Styles.cancelImage,position: 'absolute',
            top: 600,
            bottom: 0,
           }}
            onPress={() => {setShowCamera(true);setImageSource("")}}>
             <Icon
                  name="cancel"
                  type="metrialicons"
                  size={70} color="#fff"
                />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
