
import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice";
import { themeReducer } from "./ThemeSlice";
import { rootTodoReducer } from "./TodoSlice";



export const storeTodo = configureStore({reducer: rootTodoReducer});


// const storeAccount = createStore(rootAccountReducer, enchancer);

export const storeAccount = configureStore({reducer: {
    account: accountReducer,
    theme: themeReducer,
}, });


export default storeAccount;
