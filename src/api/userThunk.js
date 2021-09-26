import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const { data } = await api.post("/login", formData);
      data.status === 200 &&
        localStorage.setItem("userInfo", JSON.stringify(data.data));
      return data;
    } catch (err) {
      return rejectWithValue(err.msg);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    { email, name, phone, photo, password, confirmPassword },
    { rejectWithValue }
  ) => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phone", phone);
    photo && formData.append("photo", photo);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    console.log({ formData });
    try {
      const { data } = await api.post("/register", formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.msg);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/forgetPassword", {
        Forgot: { email },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.msg);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ password, confirmPassword }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/restPassword", {
        Forgot: { password, confirmPassword },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.msg);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post("/logout", { id: userInfo.Id });
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.msg);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async ({ reg_code }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/verifyEmail", { reg_code });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.msg);
    }
  }
);

export const reSendEmailVerifyCode = createAsyncThunk(
  "user/reSendEmailVerifyCode",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/resendEmail", { email });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.msg);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserprofile",
  async (_, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/profile",
        { id: userInfo.Id },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.msg);
    }
  }
);
