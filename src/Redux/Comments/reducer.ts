import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface CommentStoreInterface {
  listOfComments: any;
  isPopup: boolean;
  updateId: string;
}
export interface CommentStoreInterfaceListComment {
  listOfComments: any;
}
export interface CommentStoreInterfaceUpdatePopup {
  // isPopup: boolean;
  updateId: string;
}
export interface CommentStoreInterfaceDelete {
  id: string;
}
export interface CommentStoreInterfacePopup {
  isPopup: boolean;
}
export interface CommentStoreInterfaceCompleted {
  id: string;
}
export interface CommentStoreInterfaceUpdateId {
  id: string;
}
export const CommentState: CommentStoreInterface = {
  listOfComments: [],
  isPopup: false,
  updateId: '',
};
// import { Action } from "redux";

// const getStorage = async () => {
//   try {
//     AsyncStorage
//   } catch (error) {}
// };
export const Comment = createSlice({
  name: 'Comment',
  initialState: CommentState,
  reducers: {
    comments: (
      state: CommentStoreInterface,
      action: PayloadAction<CommentStoreInterfaceListComment>,
    ) => ({
      ...state,
      listOfComments: [...action.payload.listOfComments],

      updateId: '',
    }),
    setPopupComment: (
      state: CommentStoreInterface,
      action: PayloadAction<CommentStoreInterfaceUpdatePopup>,
    ) => ({
      ...state,
      isPopup: !state.isPopup,
      updateId: action.payload.updateId,
    }),
  },
});
export const {comments,setPopupComment} = Comment.actions;

export const CommentReducer = Comment.reducer;
