import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: "todo", 
    initialState: [],
    reducers: {changeTodoArr(state, action){
        return { ...state, todo: action.payload }
    }}
})

export const {changeTodoArr} = TodoSlice.actions;
export const rootTodoReducer = TodoSlice.reducer 