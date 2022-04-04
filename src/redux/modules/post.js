import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, post_list => ({ post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));

const initialState = {
  list: [],
};

const initialPost = {   // <== 기본 폼으로 정의해주기 
  id: 0,
  user_info: {
    user_name: "bingi",
    user_profile:
      "https://i.pinimg.com/564x/6d/45/81/6d45817cbb8691cb1ce4e2c3b2357c65.jpg",
  },
  image_url:
    "https://i.pinimg.com/564x/a2/fa/50/a2fa50e5c6eb5e3324c90b7f044c597e.jpg",
  contents: "여기 콘텐츠 다아아아~~!!",
  comment_cnt: 10,
  insert_dt: "2022-03-31 12:14:32",
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) => produce(state, draft => {}),
    [ADD_POST]: (state, action) => produce(state, draft => {}),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
};

export { actionCreators };
