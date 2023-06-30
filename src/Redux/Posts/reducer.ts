import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface PostStoreInterface {
  listOfPosts: any;
  isPopup: boolean;
  updateId: string;
  totalPosts:number;
}
export interface PostStoreInterfaceListPost {
  listOfPosts: any;
  totalPosts:number;
}
export interface PostStoreInterfaceUpdatePost {
  updateData: any;
}
export interface PostStoreInterfaceDelete {
  id: string;
}
export interface PostStoreInterfacePopup {
  isPopup: boolean;
}
export interface PostStoreInterfaceCompleted {
  id: string;
}
export interface PostStoreInterfaceUpdateId {
  id: string;
}
export const PostState: PostStoreInterface = {
  listOfPosts: [],
  isPopup: false,
  updateId: "",
  totalPosts:100
};
// import { Action } from "redux";

// const getStorage = async () => {
//   try {
//     AsyncStorage
//   } catch (error) {}
// };
export const Post = createSlice({
  name: "Post",
  initialState: PostState,
  reducers: {
    posts: (state: any, action: PayloadAction<PostStoreInterfaceListPost>) => ({
      ...state,
      listOfPosts: [...action.payload.listOfPosts],
      totalPosts: action.payload.totalPosts,
      updateId: "",
    }),
   
  },
});
export const {
  posts,
 
} = Post.actions;

export const PostReducer= Post.reducer;
