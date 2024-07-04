
import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice";
import { themeReducer } from "./ThemeSlice";
import { rootTodoReducer } from "./TodoSlice";

const myMiddleware1 = (store) => {
    return function (next) {
        return function (action) {
            next(action)
        } 
    }
}

const myMiddleware2 = store => next => action => {
    next(action)
}
export const storeTodo = configureStore({reducer: rootTodoReducer, middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    return [...middleware, myMiddleware1, myMiddleware2]
}});


// const storeAccount = createStore(rootAccountReducer, enchancer);

export const storeAccount = configureStore({reducer: {
    account: accountReducer,
    theme: themeReducer,
}, });


export default storeAccount;
