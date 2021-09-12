import { createSlice } from "@reduxjs/toolkit";
import {
  attemptTime,
  bookmarkQuestion,
  finishExam,
  freeExamList,
  markReviewQuestion,
  resetAnswer,
  saveQuestion,
  startExam,
  submitExam,
  unBookmarkQuestion,
} from "./examThunk";

const initialState = {
  examsList: { pending: null, exams: [] },
  examsData: { time: null, exam: [] },
  saveQuestion: "",
  bookmarkQuestion: "",
  unBookmarkQuestion: "",
  markReviewQuestion: "",
  resetAnswer: "",
  attemptTime: "",
  submitExam: "",
  finishExam: "",
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    questionOpened: (state, action) => {
      const { qId } = action.payload;
      state.examsData.exam[qId - 1].ExamStat.opened = "1";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(freeExamList.fulfilled, (state, action) => {
      state.examsList = action.payload;
    });
    builder.addCase(startExam.fulfilled, (state, action) => {
      state.examsData = action.payload;
    });
    builder.addCase(saveQuestion.fulfilled, (state, action) => {
      const { qId, option_selected } = action.payload;
      state.saveQuestion = action.payload;
      state.examsData.exam[qId - 1].ExamStat.option_selected = option_selected;
      state.examsData.exam[qId - 1].ExamStat.answered = "1";
    });
    builder.addCase(bookmarkQuestion.fulfilled, (state, action) => {
      const { qId } = action.payload;
      state.bookmarkQuestion = action.payload;
      state.examsData.exam[qId - 1].ExamStat.bookmark = true;
    });
    builder.addCase(unBookmarkQuestion.fulfilled, (state, action) => {
      const { qId } = action.payload;
      state.unBookmarkQuestion = action.payload;
      state.examsData.exam[qId - 1].ExamStat.bookmark = false;
    });
    builder.addCase(markReviewQuestion.fulfilled, (state, action) => {
      const { qId } = action.payload;
      state.markReviewQuestion = action.payload;
      state.examsData.exam[qId - 1].ExamStat.review =
        !state.examsData.exam[qId - 1].ExamStat.review;
    });
    builder.addCase(resetAnswer.fulfilled, (state, action) => {
      const { qId } = action.payload;
      state.resetAnswer = action.payload;
      state.examsData.exam[qId - 1].ExamStat.option_selected = null;
      state.examsData.exam[qId - 1].ExamStat.answered = "0";
    });
    builder.addCase(attemptTime.fulfilled, (state, action) => {
      state.attemptTime = action.payload;
    });
    builder.addCase(submitExam.fulfilled, (state, action) => {
      state.submitExam = action.payload;
    });
    builder.addCase(finishExam.fulfilled, (state, action) => {
      state.finishExam = action.payload;
    });
  },
});
export const { questionOpened } = examSlice.actions;

export default examSlice.reducer;
