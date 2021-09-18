import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const getUserProfile = createAsyncThunk(
  "user/getUserprofile",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/profile",
        { id },
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
