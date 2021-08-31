import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { signin } from "./actions/userActions";
import { examListReducer, startExamReducer } from "./reducers/examReducers";
import { userSigninReducer } from "./reducers/userReducers";

var userInfo = null;
if (localStorage.getItem("userInfo")) {
  userInfo = JSON.parse(localStorage.getItem("userInfo"));
}

const initialState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
  userSignin: userSigninReducer,
  freeExamList: examListReducer,
  startExam: startExamReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

if (store.getState().userSignin.userInfo === null) {
  store.dispatch(signin());
}

// setTimeout(()=>store.dispatch(freeExamList()),3000);

// import { configureStore } from '@reduxjs/toolkit'
// import userReducer, { fetchUser, userLogout } from "./userSlice";
// const store = configureStore({
//   reducer: {
//       user:userReducer
//   },
// })

// export default store;

// store.dispatch(fetchUser());

// setTimeout(()=>store.dispatch(userLogout()),4000);
