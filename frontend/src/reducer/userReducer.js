import {
  signin,
  GET_DATA_SUCCESS,
  SIGNED_OUT,
} from "../const/userConstant";

const arrCookies = document.cookie.split("; ");
let accessToken = "";
arrCookies.forEach((value) => {
  accessToken = value.split("accessToken=")[1] || "";
});

const initialUserState = {
  _id: "",
  username: "",
  accessToken,
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case signin.SIGNIN_SUCCESS:
      {
        const { user, accessToken } = action.payload;
        state = {
          ...state,
          _id: user._id,
          username: user.username,
          accessToken,
        };
      }
      break;
    case GET_DATA_SUCCESS:
      {
        const { user } = action.payload;
        state = {
          ...state,
          _id: user._id,
          username: user.username
        };
      }
      break;
    case SIGNED_OUT:
      state = { ...initialUserState };
      const date = new Date(null);
      document.cookie = `accessToken=; expires=${date}; path=/`;
      break;
  }

  return state;
};

export default userReducer;
