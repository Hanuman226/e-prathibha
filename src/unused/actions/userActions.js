import api from "../../axios.config";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
} from "../../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    let formData = new FormData();
    formData.append("email", "scientificfacts226@gmail.com");
    formData.append("password", "scientific123");
    const { data } = await api.post("/login", formData);
    if (process.env.NODE_ENV === "production") {
      sessionStorage.setItem("userInfo", JSON.stringify(data.data));
    } else {
      localStorage.setItem("userInfo", JSON.stringify(data.data));
    }
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

export { signin };
