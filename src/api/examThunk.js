import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const freeExamList = createAsyncThunk(
  "exam/freeExamList",
  async (appdata, { dispatch, getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
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
      return data.data;
    } catch (error) {
      return rejectWithValue(error.msg);
    }
  }
);

export const startExam = createAsyncThunk(
  "exam/startExam",
  async (examId, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
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
      return data.data;
    } catch (error) {
      return rejectWithValue(error.msg);
    }
  }
);

export const saveQuestion = createAsyncThunk(
  "exam/saveQuestion",
  async (body, { getState, rejectWithValue }) => {
    const {
      data: {
        Exam: { option_selected },
      },
      qId,
    } = body;
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      let {
        user: { userInfo },
      } = getState();

      await api.post("/save_ques", body, {
        headers: {
          tokenu: userInfo.Token,
          Id: userInfo.Id,
          server_key: serverKey,
        },
      });
      return { qId, option_selected };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const bookmarkQuestion = createAsyncThunk(
  "exam/bookmarkQuestion",
  async ({ examId, qId }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      await api.post(
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

      return { examId, qId };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const unBookmarkQuestion = createAsyncThunk(
  "exam/unBookmarkQuestion",
  async ({ examId, qId }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      await api.post(
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
      return { examId, qId };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const markReviewQuestion = createAsyncThunk(
  "exam/markReviewQuestion",
  async ({ examId, qId }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      await api.post(
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
      return { examId, qId };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const resetAnswer = createAsyncThunk(
  "exam/resetAnswer",
  async ({ examId, qId }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
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
      return { examId, qId };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.msg);
    }
  }
);

export const submitExam = createAsyncThunk(
  "exam/submitExam",
  async ({ examId, examresultId }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
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
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const finishExam = createAsyncThunk(
  "exam/finishExam",
  async ({ examId, qno }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/finishExam",
        { examId, qno },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
