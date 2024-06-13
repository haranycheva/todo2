import { devToolsEnhancer } from "@redux-devtools/extension";
import { createStore } from "redux";
import { rootTodoReducer } from "./reducer";

const enchancer = devToolsEnhancer();


export const storeTodo = createStore(rootTodoReducer, enchancer);


// const initialAccountSrore = {
//   account: {
//     balance: 0,
//   },
// };

// const rootAccountReducer = (state = initialAccountSrore, action) => {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         account: {
//           ...state.account,
//           balance: state.account.balance + action.payload,
//         },
//       };
//     case "account/withdraw":
//       return {
//         ...state,
//         account: {
//           ...state.account,
//           balance: state.account.balance - action.payload,
//         },
//       };
//     default:
//       return state;
//   }
// };

// const storeAccount = createStore(rootAccountReducer, enchancer);

// export default storeAccount;
