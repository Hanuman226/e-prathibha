import api from "../../axios.config";
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
  OPTION_SELECT,
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
} from "../../constants/examContants";

const freeExamList = () => async (dispatch, getState) => {
  dispatch({ type: FREE_EXAM_LIST_REQUEST });
  try {
    let serverKey = process.env.REACT_APP_SERVER_KEY;
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await api.post(
      "/test_free_exam",
      {},
      {
        headers: {
          tokenu: userInfo.Token,
          Id: userInfo.Id,
          server_key: serverKey,
        },
      }
    );
    dispatch({ type: FREE_EXAM_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: FREE_EXAM_LIST_FAIL, payload: error.message });
  }
};

const startExam = (examId) => async (dispatch, getState) => {
  dispatch({ type: START_EXAM_REQUEST });
  try {
    let serverKey = process.env.REACT_APP_SERVER_KEY;
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await api.post(
      `/start_exam?examId=${examId}`,
      {},
      {
        headers: {
          tokenu: userInfo.Token,
          Id: userInfo.Id,
          server_key: serverKey,
        },
      }
    );
    dispatch({ type: START_EXAM_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: START_EXAM_FAIL, payload: error.message });
  }
};

const saveQuestion = (body) => async (dispatch, getState) => {
  const {
    data: {
      Exam: { lang, option_selected },
    },
    examId,
    qId,
  } = body;
  dispatch({ type: SAVE_QUESTION_REQUEST, payload: { qId, option_selected } });
  try {
    let serverKey = process.env.REACT_APP_SERVER_KEY;
    // let optionSelected = body.data.Exam.option_selected;
    // let ques_no = body.data.Exam.ques_no;
    console.log({ option_selected, qId });

    // dispatch({ type: OPTION_SELECT, payload: { optionSelected, ques_no } });

    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await api.post("/save_ques", body, {
      headers: {
        tokenu: userInfo.Token,
        Id: userInfo.Id,
        server_key: serverKey,
      },
    });
    dispatch({ type: SAVE_QUESTION_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: SAVE_QUESTION_FAIL, payload: error.message });
  }
};

const bookmarkQuestion =
  ({ examId, qId }) =>
  async (dispatch, getState) => {
    dispatch({ type: BOOKMARK_QUESTION_REQUEST, payload: { qId } });
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/bookmark_ques",
        { examId, qId },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      dispatch({ type: BOOKMARK_QUESTION_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: BOOKMARK_QUESTION_FAIL, payload: error.message });
    }
  };

const unBookmarkQuestion =
  ({ examId, qId }) =>
  async (dispatch, getState) => {
    dispatch({ type: UNBOOKMARK_QUESTION_REQUEST });
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/unbookmark_ques",
        { examId, qId },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      dispatch({ type: UNBOOKMARK_QUESTION_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: UNBOOKMARK_QUESTION_FAIL, payload: error.message });
    }
  };

const markReviewQuestion =
  ({ examId, qId }) =>
  async (dispatch, getState) => {
    dispatch({ type: MARK_REVIEW_QUESTION_REQUEST, payload: { qId } });
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/mark_review",
        { examId, qId },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      dispatch({ type: MARK_REVIEW_QUESTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: MARK_REVIEW_QUESTION_FAIL, payload: error.message });
    }
  };

const resetAnswer =
  ({ examId, qId }) =>
  async (dispatch, getState) => {
    dispatch({ type: RESET_ANSWER_REQUEST, payload: { qId } });
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/reset_ans",
        { examId, qId },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      dispatch({ type: RESET_ANSWER_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: RESET_ANSWER_FAIL, payload: error.message });
    }
  };

const submitExam =
  ({ examId, examresultId }) =>
  async (dispatch, getState) => {
    dispatch({ type: SUBMIT_EXAM_REQUEST });
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/submit",
        { examId, examresultId },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      dispatch({ type: SUBMIT_EXAM_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: SUBMIT_EXAM_FAIL, payload: error.message });
    }
  };

export {
  freeExamList,
  startExam,
  saveQuestion,
  bookmarkQuestion,
  unBookmarkQuestion,
  markReviewQuestion,
  resetAnswer,
  submitExam,
};
