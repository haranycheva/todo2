export const deposit = (value) => ({ type: "account/deposit", payload: value });
export const withdraw = (value) => ({ type: "account/withdraw", payload: value });
export const chandeTodoArr = (newArr) => ({ type: "todo/change", payload: newArr });