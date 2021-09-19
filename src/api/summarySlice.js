import { createSlice } from "@reduxjs/toolkit";
import {
  getPerformanceGraph,
  getSubjects,
  getSummaryGraph,
  getTimeGraph,
} from "./summaryThunk";

const initialState = {
  timeGraph: [],
  summaryGraph: [],
  performanceGraph: [],
  subjects: {},
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimeGraph.fulfilled, (state, action) => {
      state.timeGraph = action.payload;
    });
    builder.addCase(getSummaryGraph.fulfilled, (state, action) => {
      state.summaryGraph = action.payload;
    });
    builder.addCase(getPerformanceGraph.fulfilled, (state, action) => {
      state.performanceGraph = action.payload;
    });
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload;
    });
  },
});

export default summarySlice.reducer;
