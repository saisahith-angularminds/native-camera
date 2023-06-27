import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {removeCurrentUser, setUser} from "./actions";
export interface TodoStoreInterface {
  user:any
}
export interface TodoStoreInterfaceUpdateTodo {
  user: any;
}


const UserData={user:""}
export const User = createSlice({
  name: "user",
  initialState: UserData,
  reducers: {
    
    updateUser: (
      state: any,
      action: PayloadAction<TodoStoreInterfaceUpdateTodo>
    ) => ({
      ...state,
      user: setUser(
        action.payload.user
      ),
    }),
    removeUser: (
      state: any,
      action: PayloadAction<TodoStoreInterfaceUpdateTodo>
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
  updateUser,
} = User.actions;

export const UserReducer= User.reducer;
