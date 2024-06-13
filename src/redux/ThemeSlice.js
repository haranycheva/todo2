export const themeReducer = (state = { color: "light" }, action) => {
  switch (action.type) {
    case "theme/switch":
      return {
        ...state,
        color: action.payload,
      };
    default:
      return state;
  }
};


export const switchTheme = (theme) => ({
    type: "theme/switch",
    payload: theme,
  });
