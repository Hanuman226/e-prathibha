import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios.config";

export const searchQuestions = createAsyncThunk(
  "searchQues/searchQuestions",
  async ({ keyword }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/search_api",
        { key: keyword },
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

export const createExamOnSearchedQues = createAsyncThunk(
  "searchQues/CreateExamOnSearchedQues",
  async ({ question_ids_arr }, { getState, rejectWithValue }) => {
    try {
      let serverKey = process.env.REACT_APP_SERVER_KEY;
      const {
        user: { userInfo },
      } = getState();
      const { data } = await api.post(
        "/searched_ques",
        { qList: question_ids_arr },
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

const initialState = {
  searchedQuestions: {
    search: [],
  },
  searchedQuesExamData: "",
};

const searchQuesSlice = createSlice({
  name: "searchQuestions",
  initialState,
  reducers: {
    resetSearchedQuesData: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchQuestions.fulfilled, (state, action) => {
      state.searchedQuestions = action.payload.data;
    });
    builder.addCase(createExamOnSearchedQues.fulfilled, (state, action) => {
      state.searchedQuesExamData = action.payload;
    });
  },
});

export const { resetSearchedQuesData } = searchQuesSlice.actions;
export default searchQuesSlice.reducer;
