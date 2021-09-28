import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const getAllBookmarks = createAsyncThunk(
  "allbookmarks/getAllBookmarks",
  async (_, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/bookmark_api",
        { id: userInfo.Id },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getBookmarkedQuestion = createAsyncThunk(
  "allbookmarks/getBookmarkedQuestion",
  async ({ exam_result_id, type, qid }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/question_view",
        { id: userInfo.Id, exam_result_id, type, qid },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const unBookmarkQues = createAsyncThunk(
  "allbookmarks/unBookmarkQues",
  async ({ exam_result_id, ques_no }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/unbookmark",
        { id: userInfo.Id, exam_result_id, ques_no },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const setBookmarkedQuesPriority = createAsyncThunk(
  "allbookmarks/setBookmarkedQuesPriority",
  async (
    { ques_no, exam_result_id, priority, index },
    { getState, rejectWithValue }
  ) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/add_priority ",
        { id: userInfo.Id, ques_no, exam_result_id, priority },
        {
          headers: {
            tokenu: userInfo.Token,
            Id: userInfo.Id,
            server_key: serverKey,
          },
        }
      );
      console.log(data.data);
      return { data: data.data, index, priority };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
