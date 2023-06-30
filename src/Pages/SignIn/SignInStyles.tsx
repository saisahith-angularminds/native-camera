import { StyleSheet } from "react-native";
const borderColor="#FAFAFA"
export const SignInStyles = StyleSheet.create({
    inputContainer:{width:"100%",borderRadius:5,backgroundColor:borderColor,borderColor:borderColor,borderWidth:1,padding:5},
    buttonContainer:{
        margin:10
      },
      container:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center"
      },
      imageView:{width: 130, height: 130,}
})

