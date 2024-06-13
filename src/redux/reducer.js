import { combineReducers } from "redux";
import { accountReducer } from "./AccountSlice";
import { themeReducer } from "./ThemeSlice";

const initialTodoStore = {
  todo: [],
};

export const rootTodoReducer = (state = initialTodoStore, action) => {
  switch (action.type) {
    case "todo/change":
      return { ...state, todo: action.payload };

    default:
      return state;
  }
};

export const rootAccountReducer = combineReducers({
  account: accountReducer,
  theme: themeReducer,
});
