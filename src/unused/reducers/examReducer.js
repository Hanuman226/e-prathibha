import {
  BOOKMARK_QUESTION_FAIL,
  BOOKMARK_QUESTION_REQUEST,
  BOOKMARK_QUESTION_SUCCESS,
  FREE_EXAM_LIST_FAIL,
  FREE_EXAM_LIST_REQUEST,
  FREE_EXAM_LIST_SUCCESS,
  MARK_REVIEW_QUESTION_FAIL,
  MARK_REVIEW_QUESTION_REQUEST,
  MARK_REVIEW_QUESTION_SUCCESS,
  RESET_ANSWER_FAIL,
  RESET_ANSWER_REQUEST,
  RESET_ANSWER_SUCCESS,
  SAVE_QUESTION_FAIL,
  SAVE_QUESTION_REQUEST,
  SAVE_QUESTION_SUCCESS,
  START_EXAM_FAIL,
  START_EXAM_REQUEST,
  START_EXAM_SUCCESS,
  SUBMIT_EXAM_FAIL,
  SUBMIT_EXAM_REQUEST,
  SUBMIT_EXAM_SUCCESS,
  UNBOOKMARK_QUESTION_FAIL,
  UNBOOKMARK_QUESTION_REQUEST,
  UNBOOKMARK_QUESTION_SUCCESS,
} from "../constants/examContants";

const initialState = {
  examsList: {
    loading: "",
    payload: "",
    error: "",
  },
  examsData: {
    loading: "",
    payload: "",
    error: "",
  },
  saveQuestion: {
    loading: "",
    payload: "",
    error: "",
  },
  bookmarkQuestion: {
    loading: "",
    payload: "",
    error: "",
  },
  unBookmarkQuestion: {
    loading: "",
    payload: "",
    error: "",
  },
  markReviewQuestion: {
    loading: "",
    payload: "",
    error: "",
  },
  resetAnswer: {
    loading: "",
    payload: "",
    error: "",
  },
  submitExam: {
    loading: "",
    payload: "",
    error: "",
  },
};

export default function examReducer(state = initialState, action) {
  switch (action.type) {
    case FREE_EXAM_LIST_REQUEST:
      return {
        ...state,
        examsList: {
          ...state.examsList,
          loading: true,
        },
      };
    case FREE_EXAM_LIST_SUCCESS:
      return {
        ...state,
        examsList: {
          ...state.examsList,
          loading: false,
          payload: action.payload,
        },
      };

    case FREE_EXAM_LIST_FAIL:
      return {
        ...state,
        examsList: {
          ...state.examsList,
          loading: false,
          error: action.payload,
        },
      };

    case START_EXAM_REQUEST:
      return {
        ...state,
        examsData: {
          ...state.examsData,
          loading: true,
        },
      };
    case START_EXAM_SUCCESS:
      return {
        ...state,
        examsData: {
          ...state.examsData,
          loading: false,
          payload: action.payload,
        },
      };

    case START_EXAM_FAIL:
      return {
        ...state,
        examsData: {
          ...state.examsData,
          loading: false,
          error: action.payload,
        },
      };

    case SAVE_QUESTION_REQUEST:
      return {
        ...state,
        saveQuestion: {
          ...state.saveQuestion,
          loading: true,
        },
        examsData: {
          ...state.examsData,
          payload: {
            ...state.examsData.payload,
            exam: state.examsData.payload.exam.map((item, index) => {
              if (index === action.payload.qId - 1) {
                return {
                  ...item,
                  ExamStat: {
                    ...item.ExamStat,
                    option_selected:
                      item.ExamStat.option_selected ===
                      action.payload.option_selected
                        ? ""
                        : action.payload.option_selected,
                    answered: item.ExamStat.answered === "0" ? "1" : "1",
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case SAVE_QUESTION_SUCCESS:
      return {
        ...state,
        saveQuestion: {
          ...state.saveQuestion,
          loading: false,
          payload: action.payload,
        },
      };
    case SAVE_QUESTION_FAIL:
      return {
        ...state,
        saveQuestion: {
          ...state.saveQuestion,
          loading: false,
          error: action.payload,
        },
      };

    case BOOKMARK_QUESTION_REQUEST:
      return {
        ...state,
        bookmarkQuestion: { ...state.bookmarkQuestion, loading: true },
        examsData: {
          ...state.examsData,
          payload: {
            ...state.examsData.payload,
            exam: state.examsData.payload.exam.map((item, index) => {
              if (index === action.payload.qId - 1) {
                return {
                  ...item,
                  ExamStat: {
                    ...item.ExamStat,
                    bookmark: !item.ExamStat.bookmark,
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case BOOKMARK_QUESTION_SUCCESS:
      return {
        ...state,
        bookmarkQuestion: {
          ...state.bookmarkQuestion,
          loading: false,
          payload: action.payload,
        },
      };
    case BOOKMARK_QUESTION_FAIL:
      return {
        ...state,
        bookmarkQuestion: {
          ...state.bookmarkQuestion,
          loading: false,
          error: action.payload,
        },
      };

    case UNBOOKMARK_QUESTION_REQUEST:
      return {
        ...state,
        unBookmarkQuestion: { ...state.unBookmarkQuestion, loading: true },
      };
    case UNBOOKMARK_QUESTION_SUCCESS:
      return {
        ...state,
        unBookmarkQuestion: {
          ...state.unBookmarkQuestion,
          payload: action.payload,
        },
      };

    case UNBOOKMARK_QUESTION_FAIL:
      return {
        ...state,
        unBookmarkQuestion: {
          ...state.unBookmarkQuestion,
          loading: false,
          error: action.payload,
        },
      };

    case MARK_REVIEW_QUESTION_REQUEST:
      return {
        ...state,
        markReviewQuestion: { ...state.markReviewQuestion, loading: true },
        examsData: {
          ...state.examsData,
          payload: {
            ...state.examsData.payload,
            exam: state.examsData.payload.exam.map((item, index) => {
              if (index === action.payload.qId - 1) {
                return {
                  ...item,
                  ExamStat: {
                    ...item.ExamStat,
                    review: !item.ExamStat.review,
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case MARK_REVIEW_QUESTION_SUCCESS:
      return {
        ...state,
        markReviewQuestion: {
          ...state.markReviewQuestion,
          loading: false,
          payload: action.payload,
        },
      };

    case MARK_REVIEW_QUESTION_FAIL:
      return {
        ...state,
        markReviewQuestion: {
          ...state.markReviewQuestion,
          loading: false,
          error: action.payload,
        },
      };

    case RESET_ANSWER_REQUEST:
      return {
        ...state,
        resetAnswer: { ...state.resetAnswer, loading: true },
        examsData: {
          ...state.examsData,
          payload: {
            ...state.examsData.payload,
            exam: state.examsData.payload.exam.map((item, index) => {
              if (index === action.payload.qId - 1) {
                return {
                  ...item,
                  ExamStat: {
                    ...item.ExamStat,
                    option_selected: null,
                    answered: item.ExamStat.answered === "1" ? "0" : "0",
                  },
                };
              }
              return item;
            }),
          },
        },
      };
    case RESET_ANSWER_SUCCESS:
      return {
        ...state,
        resetAnswer: {
          ...state.resetAnswer,
          loading: false,
          payload: action.payload,
        },
      };

    case RESET_ANSWER_FAIL:
      return {
        ...state,
        resetAnswer: {
          ...state.resetAnswer,
          loading: false,
          error: action.payload,
        },
      };

    case SUBMIT_EXAM_REQUEST:
      return { ...state, submitExam: { ...state.submitExam, loading: true } };
    case SUBMIT_EXAM_SUCCESS:
      return {
        ...state,
        submitExam: {
          ...state.submitExam,
          loading: false,
          payload: action.payload,
        },
      };

    case SUBMIT_EXAM_FAIL:
      return {
        ...state,
        submitExam: {
          ...state.submitExam,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
