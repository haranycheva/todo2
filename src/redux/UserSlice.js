import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { login, logout, refreshUser, register } from "./oparations";

export const AuthSlice = createSlice({
  name: "user",
  initialState: {
    user: { email: null, userName: null },
    token: null,
    isLogged: false,
    isRefreshed: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(refreshUser.pending, (state, action) => {
        state.isRefreshed = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.users;
        state.isLogged = true;
        state.isRefreshed = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshed = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.users;
        state.isLogged = true;
        state.token = action.payload.token;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.users;
        state.isLogged = true;
        state.token = action.payload.token;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = { email: null, userName: null };
        state.isLogged = false;
        state.token = null;
      })
});

export const AuthReducer = AuthSlice.reducer;

const AuthPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const persistedAuthReduser = persistReducer(
  AuthPersistConfig,
  AuthReducer
);
