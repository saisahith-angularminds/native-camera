import { StyleSheet } from 'react-native'


export const ReAnimatedCameraStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
      },
      preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height:100,
        width:50
      },
      capture: {
        top:600,
        height:80,
        width:80,
        flex: 0,
        borderWidth:1,
        padding:4,
        borderColor:"#fff",
        borderStyle:"solid",
        borderRadius: 50,
        alignSelf: 'center',
        margin: 20,

      },
      tickMark: {
        top:600,
        right:10,
        height:80,
        width:80,
        flex: 0,
        borderWidth:1,
        padding:4,
        borderColor:"#fff",
        borderStyle:"solid",
        borderRadius: 50,
        alignSelf: 'flex-end',
        margin: 20,

      },
      cameraRotator: {
        top:483,
        right:130,
        height:70,
        width:70,
        flex: 0,
        borderWidth:1,
        padding:4,
        borderColor:"#fff",
        borderStyle:"solid",
        borderRadius: 50,
        alignSelf: 'center',
        margin: 20,

      },
      cancelImage: {
        top:600,
        height:80,
        width:80,
        flex: 0,
        borderWidth:1,
        padding:4,
        borderColor:"#fff",
        borderStyle:"solid",
        borderRadius: 50,
        alignSelf: 'flex-start',
        margin: 20,

      },
      fillCapture:{
        height:70,
        width:70,
        borderRadius: 50,
        backgroundColor:"#fff"
      }
})