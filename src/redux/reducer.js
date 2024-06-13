const initialTodoStore = {
    todo: [],
  }
  
  export const rootTodoReducer = (state = initialTodoStore, action) => {
    switch (action.type) {
      case "todo/change":
      return {...state, todo: action.payload}
  
      default:
        return state;
    }
  }