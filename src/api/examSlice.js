import { createSlice } from "@reduxjs/toolkit";
import {
  attemptTime,
  bookmarkQuestion,
  createPracticeExam,
  examResult,
  finishExam,
  freeExamList,
  getPracticeSessionSubjects,
  markReviewQuestion,
  premiumExamList,
  resetAnswer,
  saveQuestion,
  startExam,
  submitExam,
  unBookmarkQuestion,
} from "./examThunk";

const initialState = {
  freeExamsList: { pending: null, exams: [] },
  premiumExamsList: { pending: null, exams: [] },
  examsData: { time: null, exam: [] },
  saveQuestion: "",
  bookmarkQuestion: "",
  unBookmarkQuestion: "",
  markReviewQuestion: "",
  resetAnswer: "",
  attemptTime: "",
  submitExam: "",
  finishExam: "",
  examResult: {
    post: [],
  },
  practiceSessionSubjects: [],
  createPracticeExam: {},
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    questionOpened: (state, action) => {
      const { qId } = action.payload;
      state.examsData.exam[qId - 1].ExamStat.opened = "1";
    },
    bookmarkQues: (state, action) => {
      const { ques_no } = action.payload;
      state.examResult.post[ques_no - 1].ExamStat.bookmark =
        !state.examResult.post[ques_no - 1].ExamStat.bookmark;
    },
    resetExam: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(freeExamList.fulfilled, (state, action) => {
      state.freeExamsList = action.payload;
    });
    builder.addCase(premiumExamList.fulfilled, (state, action) => {
      state.premiumExamsList = action.payload;
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
    builder.addCase(examResult.fulfilled, (state, action) => {
      state.examResult = action.payload;
    });
    builder.addCase(getPracticeSessionSubjects.fulfilled, (state, action) => {
      state.practiceSessionSubjects = action.payload;
    });
    builder.addCase(createPracticeExam.fulfilled, (state, action) => {
      state.createPracticeExam = action.payload;
    });
  },
});

export const { questionOpened, resetExam, bookmarkQues } = examSlice.actions;

export default examSlice.reducer;
