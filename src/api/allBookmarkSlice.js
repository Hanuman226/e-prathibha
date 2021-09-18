import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBookmarks,
  getBookmarkedQuestion,
  setBookmarkedQuesPriority,
  unBookmarkQues,
} from "./allBookmarkThunk";

const initialState = {
  allBookmarks: [],
  bookmarkedQuestion: [],
  unbookmarkQuestion: "",
  setPriority: "",
};

const allBookmarkSlice = createSlice({
  name: "allBookmarks",
  initialState,
  reducers: {
    removeUnBookmarkedQues: (state, action) => {
      state.allBookmarks.splice(action.payload, 1);
    },
    resetBookmarkedQuestion: (state) => {
      state.bookmarkedQuestion = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBookmarks.fulfilled, (state, action) => {
      state.allBookmarks = action.payload;
    });
    builder.addCase(getBookmarkedQuestion.fulfilled, (state, action) => {
      state.bookmarkedQuestion = action.payload;
    });
    builder.addCase(unBookmarkQues.fulfilled, (state, action) => {
      state.unbookmarkQuestion = action.payload;
    });
    builder.addCase(setBookmarkedQuesPriority.fulfilled, (state, action) => {
      const { data, index, priority } = action.payload;
      state.setPriority = data;
      state.allBookmarks[index].priority = priority;
    });
  },
});
export const { removeUnBookmarkedQues, resetBookmarkedQuestion } =
  allBookmarkSlice.actions;
export default allBookmarkSlice.reducer;
