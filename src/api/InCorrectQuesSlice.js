import { createSlice } from "@reduxjs/toolkit";

import {
  getAllIncorrectQuestions,
  getInCorrectQuestion,
} from "./InCorrectQuesThunk";

const initialState = {
  inCorrectQuestions: [],
  inCorrectQues: [],
};

const inCorrectQuesSlice = createSlice({
  name: "inCorrectQues",
  initialState,
  reducers: {
    resetInCorrectQues: (state) => {
      state.inCorrectQues = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIncorrectQuestions.fulfilled, (state, action) => {
      state.inCorrectQuestions = action.payload;
    });
    builder.addCase(getInCorrectQuestion.fulfilled, (state, action) => {
      state.inCorrectQues = action.payload;
    });
  },
});
export const { resetInCorrectQues } = inCorrectQuesSlice.actions;
export default inCorrectQuesSlice.reducer;
