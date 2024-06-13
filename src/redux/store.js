import { devToolsEnhancer } from "@redux-devtools/extension";
import { createStore } from "redux";
import { rootAccountReducer, rootTodoReducer } from "./reducer";

const enchancer = devToolsEnhancer();


export const storeTodo = createStore(rootTodoReducer, enchancer);


const storeAccount = createStore(rootAccountReducer, enchancer);

export default storeAccount;
