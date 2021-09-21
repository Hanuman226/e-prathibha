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
  loading: false,
  error: null,
};

const summarySlice = createSlice({
  name: "summary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTimeGraph.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTimeGraph.fulfilled, (state, action) => {
      state.timeGraph = action.payload;
      state.loading = false;
    });
    builder.addCase(getSummaryGraph.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSummaryGraph.fulfilled, (state, action) => {
      state.summaryGraph = action.payload;
      state.loading = false;
    });
    builder.addCase(getPerformanceGraph.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPerformanceGraph.fulfilled, (state, action) => {
      state.performanceGraph = action.payload;
      state.loading = false;
    });
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload;
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

export default summarySlice.reducer;
