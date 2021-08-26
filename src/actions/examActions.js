import Axios from "axios";
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
    const { data } = await Axios.post(
      "https://www.errortechnologies.com/quizdemo/apis/test_free_exam",
      {},
      {
        headers: {
          tokenu: userInfo.Token,
          Id: userInfo.Id,
          server_key: "3w99V63pW7tJ7vavGXtCKo8cp",
        },
      }
    );
    // const data = await fetch("https://www.errortechnologies.com/quizdemo/apis/test_free_exam",{
    //   method: "POST",
    //   mode:"cors",
    //   data:'',
    //   headers:{
    //     'tokenu': userInfo.Token,
    //     'Id': userInfo.Id,
    //     'server_key': '3w99V63pW7tJ7vavGXtCKo8cp',
    //   }
    // }).then(res=>res.json());
    // console.log(data);
    dispatch({ type: FREE_EXAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FREE_EXAM_LIST_FAIL, payload: error.message });
  }
};

export { freeExamList };
