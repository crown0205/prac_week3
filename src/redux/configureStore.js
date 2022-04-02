import { createAction, handleAction } from "redux-actions";
import { produce } from "immer";

import { setCookie, deleteCookie, getCookie } from "../shared/Cookie"

//actions type
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators // 액션함수를 "redux-actions"이 패키지로 받아 편하게 바꿔준거다.
const logIn = createAction(LOG_IN, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// reducer
export default handleAction({
  [LOG_IN]: (state, action) => produce(state, (draft)=>{
    setCookie("is_login", "success"); // 원래는 토큰이 들어가야된다.
    draft.user = action.payload.user;
    draft.is_login = true;
  }),
  [LOG_OUT]: (state, action) => produce(state, (draft)=>{}),
  [GET_USER]: (state, action) => produce(state, (draft)=>{}),
}, initialState);

//action creator export
const actionCroeators = {
  logIn,
  logOut,
  getUser,
}

export {actionCroeators}