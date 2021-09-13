import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserProfile } from "./userThunk";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (appdata, { rejectWithValue }) => {
    let formData = new FormData();
    formData.append("email", "scientificfacts226@gmail.com");
    formData.append("password", "scientific123");
    try {
      const { data } = await axios.post(
        "https://e-prathibha.com/apis/login",
        formData
      );
      localStorage.setItem("userInfo", JSON.stringify(data.data));
      return data.data;
    } catch (err) {
      return rejectWithValue(err.msg);
    }
  }
);

var userInfo = null;
if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
}
const initialState = {
  userInfo: userInfo,
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
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;
