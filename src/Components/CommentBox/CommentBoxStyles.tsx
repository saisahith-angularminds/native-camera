import { StyleSheet } from "react-native";

export const CommentBoxStyles = StyleSheet.create({
    container: {
      flex: 1,
     width:"100%",
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      width: '100%',
    },
    dialogText: {
      fontSize: 18,
      marginBottom: 16,
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginTop: 8,
    },
    closeButtonText: {
      fontSize: 16,
      color: '#007AFF',
    },
  });