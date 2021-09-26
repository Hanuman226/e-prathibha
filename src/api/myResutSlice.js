import { createSlice } from "@reduxjs/toolkit";
import { getMyResult } from "./myResultThunk";

const initialState = {
  myResult: [],
  loading: false,
  error: null,
};

const myResultSlice = createSlice({
  name: "myResult",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyResult.fulfilled, (state, action) => {
      state.myResult = action.payload;
    });
  },
});

export default myResultSlice.reducer;
