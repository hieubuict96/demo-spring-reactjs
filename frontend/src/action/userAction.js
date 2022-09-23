import axios from "axios";
import axiosInstance from "../common-middleware/axiosInstance";
import {
  signin,
  GET_DATA_SUCCESS,
  SIGNED_OUT,
} from "../const/userConstant";

export function signupAction(username, password, setError) {
  return async (dispatch) => {
    try {
      if (username === "") {
        throw new Error("usernameEmpty");
      }

      if (password === "") {
        throw new Error("passwordEmpty");
      }
    
      const response = await axios.post("/api/auth/signup", {
        username, password
      });
      setError("");
      alert("Đăng ký thành công");
    } catch (error) {
      if (error.message === "usernameEmpty") {
        return setError("usernameEmpty");
      }

      if (error.message === "passwordEmpty") {
        return setError("passwordEmpty");
      }

      if (error.response.data.error === "usernameAlreadyUse") {
        return setError("usernameAlreadyUse");
      }

      if (error.response.status >= 500) {
        alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
      }
    }
  };
}

export const signinAction = (user, password, setError) => async (dispatch) => {
  try {
    const response = await axios.post("/api/auth/signin", { user, password });

    dispatch({
      type: signin.SIGNIN_SUCCESS,
      payload: {
        user: response.data.user,
        accessToken: response.data.accessToken,
      },
    });
    const date = new Date();
    date.setDate(date.getDate() + 30);
    document.cookie = `accessToken=${response.data.accessToken}; expires=${date}; path=/`;
  } catch (error) {
    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }

    if (error.response.data.error === "signinFail") {
      return setError("signinFail");
    }
  }
};

export const getDataAction = () => async (dispatch) => {
  try {
    const arrCookies = document.cookie.split("; ");
    const accessToken = arrCookies.find((x) => /accessToken=/.test(x))
      ? arrCookies.find((x) => /accessToken=/.test(x)).split("accessToken=")[1]
      : "";

    if (accessToken) {
      const response = await axios.get("/api/auth/get-data", {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });

      const { user } = response.data;
      dispatch({ type: GET_DATA_SUCCESS, payload: { user } });
    } else {
      dispatch({ type: SIGNED_OUT });
    }
  } catch (error) {
    if (error.response.data.status === 401) {
      return dispatch({ type: SIGNED_OUT });
    }

    if (error.response.status >= 500) {
      alert("Đã xảy ra lỗi phía máy chủ, vui lòng thử lại sau");
    }
  }
};

export const signoutAction = (navigate) => (dispatch) => {
  dispatch({ type: SIGNED_OUT });
  navigate("/customer/signin")
};
