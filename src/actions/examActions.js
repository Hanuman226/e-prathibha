import axios from "axios";
import {
  FREE_EXAM_LIST_FAIL,
  FREE_EXAM_LIST_REQUEST,
  FREE_EXAM_LIST_SUCCESS,
} from "../constants/examContants";

const api = axios.create({
  baseURL: `https://www.errortechnologies.com/quizdemo/apis`,
});
const freeExamList = () => async (dispatch, getState) => {
  dispatch({ type: FREE_EXAM_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await api.post(
      "/test_free_exam",{},
      {

        'headers': {
          'tokenu': userInfo.Token,
          'Id': userInfo.Id,
          'server_key': "3w99V63pW7tJ7vavGXtCKo8cp",
        },
    }
    );
   
    console.log(data);
    dispatch({ type: FREE_EXAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FREE_EXAM_LIST_FAIL, payload: error.message });
  }
};

export { freeExamList };
