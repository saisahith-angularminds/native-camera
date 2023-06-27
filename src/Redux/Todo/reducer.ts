import AsyncStorage from "@react-native-async-storage/async-storage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { checkOrNot, deleteTodo, updateTodo } from "./actions";
export interface TodoStoreInterface {
  listOfTodos: any;
  isPopup: boolean;
  updateId: string;
}
export interface TodoStoreInterfaceListTodo {
  listOfTodos: any;
}
export interface TodoStoreInterfaceUpdateTodo {
  updateData: any;
}
export interface TodoStoreInterfaceDelete {
  id: string;
}
export interface TodoStoreInterfacePopup {
  isPopup: boolean;
}
export interface TodoStoreInterfaceCompleted {
  id: string;
}
export interface TodoStoreInterfaceUpdateId {
  id: string;
}
export const TodoState: TodoStoreInterface = {
  listOfTodos: [],
  isPopup: false,
  updateId: "",
};
// import { Action } from "redux";

// const getStorage = async () => {
//   try {
//     AsyncStorage
//   } catch (error) {}
// };
export const Todo = createSlice({
  name: "Todo",
  initialState: TodoState,
  reducers: {
    todo: (state: any, action: PayloadAction<TodoStoreInterfaceListTodo>) => ({
      ...state,
      listOfTodos: [...action.payload.listOfTodos],
      updateId: "",
    }),
    updateTodoData: (
      state: any,
      action: PayloadAction<TodoStoreInterfaceUpdateTodo>
    ) => ({
      ...state,
      listOfTodos: updateTodo(
        state.listOfTodos,
        state.updateId,
        action.payload.updateData
      ),
      updateId: "",
    }),
    deleteTodoById: (
      state: any,
      action: PayloadAction<TodoStoreInterfaceDelete>
    ) => ({
      ...state,
      listOfTodos: deleteTodo(state.listOfTodos, action.payload.id),
      updateId: "",
    }),
    completedOrNot: (
      state: any,
      action: PayloadAction<TodoStoreInterfaceDelete>
    ) => ({
      ...state,
      listOfTodos: checkOrNot(state.listOfTodos, action.payload.id),
      updateId: "",
    }),
    setPopUp: (state: any, action: PayloadAction<TodoStoreInterfacePopup>) => ({
      ...state,
      isPopup: action.payload.isPopup,
    }),
    editId: (
      state: any,
      action: PayloadAction<TodoStoreInterfaceUpdateId>
    ) => ({
      ...state,
      updateId: action.payload.id,
    }),
  },
});
export const {
  todo,
  deleteTodoById,
  completedOrNot,
  setPopUp,
  editId,
  updateTodoData,
} = Todo.actions;

export const TodoReducer= Todo.reducer;
