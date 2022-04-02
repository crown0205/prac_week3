import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie, getCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";

//actions type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators // 액션함수를 "redux-actions"이 패키지로 받아 편하게 바꿔준거다.
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));
const setUser = createAction(SET_USER, user => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// const user_inital = {
//   user_name: "Noah",
// }

//middleware actions
const loginAction = user => {
  return function (dispatch, getState, { history }) {
    console.log(history);
    dispatch(setUser(user));
    history.push("/");
  };
};

const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then(user => {
        console.log(user);
        auth.currentUser.updateProfile({
          displayName: user_name,
        }).then(()=>{
          dispatch(setUser({user_name: user_name, id: id, user_profile:""}))
          history.push("/")
        }).catch((error)=>{
          console.log(error)
        })

        // Signed in
        // ...
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        // "draft"가 immer를 사용하여 불변성을 관리해주는 방법? 이다.
        setCookie("is_login", "success"); // 원래는 토큰이 들어가야된다.
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, draft => {}),
  },
  initialState
);

//action creator export 액션생성함수를 export해줘야 다른곳에서 가져다 쓸수 있어서 해주는거다.
const actionCreators = {
  logOut,
  getUser,
  loginAction,
  signupFB,
};

export { actionCreators };
