import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {CameraStyles} from './CameraStyles';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Button, Icon, Image } from '@rneui/base';
export const CameraComponent = () => {
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
        <View style={CameraStyles.container}>
          <Camera
            photo={true}
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
          />
          
          <TouchableOpacity style={CameraStyles.capture} onPress={capturePhoto}>
            <View style={CameraStyles.fillCapture}></View>
          </TouchableOpacity>
          <TouchableOpacity style={CameraStyles.cameraRotator} onPress={()=>setRotate(prev=>!prev)}>
          <Icon
                  name="refresh"
                  type="evilicon"
                  size={60} color="#fff"
                  />
          </TouchableOpacity>
          
        </View>
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
            style={ {...CameraStyles.tickMark,position: 'absolute',
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
            style={ {...CameraStyles.cancelImage,position: 'absolute',
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
