import api from "../axios.config";
import {
  FREE_EXAM_LIST_FAIL,
  FREE_EXAM_LIST_REQUEST,
  FREE_EXAM_LIST_SUCCESS,
} from "../constants/examContants";

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

export { freeExamList };
