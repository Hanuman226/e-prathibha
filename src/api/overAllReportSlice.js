import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const getOverAllReport = createAsyncThunk(
  "summary/getOverAllReport",
  async (_, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/overall_report",
        {},
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  overAllReport: {},
};

const overAllReportSlice = createSlice({
  name: "overAllReport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOverAllReport.fulfilled, (state, action) => {
      state.overAllReport = action.payload.data;
    });
  },
});

export default overAllReportSlice.reducer;
