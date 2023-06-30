import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {removeCurrentUser, setUser} from "./actions";
export interface UserStoreInterface {
  user:any
}
export interface UserStoreInterfaceUpdateUser {
  user: any;
}
export interface UserStoreInterfaceToken {
  token: any;
}

const UserData={user:"",token:null}
export const User = createSlice({
  name: "user",
  initialState: UserData,
  reducers: {
    
    updateUser: (
      state: any,
      action: PayloadAction<UserStoreInterfaceUpdateUser>
    ) => ({
      ...state,
      user: setUser(
        action.payload.user
      ),
    }),
    updateToken:(state:any,action: PayloadAction<UserStoreInterfaceToken>)=>({
      ...state,
      token: 
        action.payload.token
     
    }),
    removeUser: (
      state: any,
      action: PayloadAction<UserStoreInterfaceUpdateUser>
    )=>({
      ...state,
      user:setUser(
        action.payload.user
      ),
    })
  },
});
export const {
  removeUser,
  updateUser,updateToken
} = User.actions;

export const UserReducer= User.reducer;
