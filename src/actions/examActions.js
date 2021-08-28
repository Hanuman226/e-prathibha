import api from "../axios.config";
import {
  FREE_EXAM_LIST_FAIL,
  FREE_EXAM_LIST_REQUEST,
  FREE_EXAM_LIST_SUCCESS,
} from "../constants/examContants";

const freeExamList = () => async (dispatch, getState) => {
  dispatch({ type: FREE_EXAM_LIST_REQUEST });
  try {
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
          server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
        },
      }
    );

    dispatch({ type: FREE_EXAM_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: FREE_EXAM_LIST_FAIL, payload: error.message });
  }
};

export { freeExamList };
