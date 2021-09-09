// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import { signin } from "./actions/userActions";
// import examReducer from "./reducers/examReducer";
// import { userSigninReducer } from "./reducers/userReducers";

// var userInfo = null;
// if (process.env.NODE_ENV === "production") {
//   if (sessionStorage.getItem("userInfo")) {
//     userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
//   }
// } else {
//   if (localStorage.getItem("userInfo"))
//     userInfo = JSON.parse(localStorage.getItem("userInfo"));
// }

// const initialState = {
//   userSignin: { userInfo },
// };
// const reducer = combineReducers({
//   userSignin: userSigninReducer,
//   examInfo: examReducer,
// });
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );
// export default store;

// if (store.getState().userSignin.userInfo === null) {
//   store.dispatch(signin());
// }

// setTimeout(()=>store.dispatch(freeExamList()),3000);

import { configureStore } from "@reduxjs/toolkit";
import userReducer, { fetchUser } from "./userSlice";
import examReducer from "./examSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    exam: examReducer,
  },
});

export default store;

if (store.getState().user.userInfo === null) {
  store.dispatch(fetchUser());
}
