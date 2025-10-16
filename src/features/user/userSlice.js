import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logInPasswordViewBtn: true,
  signUppasswordViewBtn: true,
  confirmPasswordBtn: true,
  userBtn: false,
  loginBtn: false,
  signUpBtn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogInPasswordView(state) {
      state.logInPasswordViewBtn = !state.logInPasswordViewBtn;
    },
    SignUpPasswordView(state) {
      state.signUppasswordViewBtn = !state.signUppasswordViewBtn;
    },
    ConfirmPasswordView(state) {
      state.confirmPasswordBtn = !state.confirmPasswordBtn;
    },
    userButton(state) {
      state.userBtn = !state.userBtn;
    },
    userButton2(state, action) {
      state.userBtn = action.payload;
    },
    login(state, action) {
      state.loginBtn = action.payload;
    },
    signUp(state, action) {
      state.signUpBtn = action.payload;
    },
  },
});

export const {
  userButton,
  login,
  signUp,
  LogInPasswordView,
  SignUpPasswordView,
  ConfirmPasswordView,
  userPassWordChange,
  userButton2,
} = userSlice.actions;
export default userSlice.reducer;
