import { StyleSheet } from "react-native";
const borderColor="#FAFAFA"
export const SignInStyles = StyleSheet.create({
    inputContainer:{width:"100%",borderRadius:5,backgroundColor:borderColor,borderColor:borderColor,borderWidth:1,padding:5},
    buttonContainer:{
        marginHorizontal: 10,
        marginVertical: 10,
      },
      container:{
        flex:1,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
      },
      imageView:{width: 130, height: 130,}
})

