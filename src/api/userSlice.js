import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getUserProfile,
  login,
  logout,
  register,
  reSendEmailVerifyCode,
  resetPassword,
  verifyEmail,
} from "./userThunk";

var userInfo = null;
if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const initialState = {
  userInfo: userInfo,
  register: "",
  logout: "",
  forgotPassword: "",
  resetPassword: "",
  verifyEmail: "",
  reSendEmailVerifyCode: "",
  profile: "",
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.data;
    });

    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.register = action.payload;
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.forgotPassword = action.payload;
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.resetPassword = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.logout = action.payload;
    });
    builder.addCase(verifyEmail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.verifyEmail = action.payload;
    });

    builder.addCase(reSendEmailVerifyCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(reSendEmailVerifyCode.fulfilled, (state, action) => {
      state.loading = false;
      state.reSendEmailVerifyCode = action.payload;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("rejected"),
      (state, action) => {
        state.loading = false;
        state.error = action.error;
      }
    );
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
