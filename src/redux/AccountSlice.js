export const accountReducer = (state = { balance: 100 }, action) => {
  switch (action.type) {
    case "account/deposit":
      return{
          ...state,
          balance: state.balance + action.payload,
      }
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
    };
    case "theme/switch":
      return {
        ...state,
        theme: {
          ...state.theme,
          color: action.payload,
        },
      };
    default:
      return state;
  }
};

export const deposit = (value) => ({
    type: "account/deposit",
    payload: value,
  });
  
  export const withdraw = (value) => ({
    type: "account/withdraw",
    payload: value,
  });
