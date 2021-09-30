import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import examReducer from "./examSlice";
import allbookmarkReducer from "./allBookmarkSlice";
import InCorrectQuesReducer from "./InCorrectQuesSlice";
import summaryReducer from "./summarySlice";
import myResultReducer from "./myResutSlice";
import overAllReportReducer from "./overAllReportSlice";
import searchQuesReducer from "./searchQuesSlice";
import packagesReducer from "./packagesSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
    allBookmarks: allbookmarkReducer,
    inCorrectQues: InCorrectQuesReducer,
    summary: summaryReducer,
    myResult: myResultReducer,
    overAllReport: overAllReportReducer,
    searchQues: searchQuesReducer,
    packages: packagesReducer,
  },
});

export default store;
