import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  let formData = new FormData();
  formData.append("email", "scientificfacts226@gmail.com");
  formData.append("password", "scientific123");
  const { data } = await axios.post(
    "https://e-prathibha.com/apis/login",
    formData
  );
  return data;
});

const initialState = {
  userInfo: "",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userInfo = "";
      state.status="idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload.data;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
