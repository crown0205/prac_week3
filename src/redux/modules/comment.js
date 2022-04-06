import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../shared/firebase";
import moment from "moment";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));
const loading = createAction(LOADING, is_loading => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      // post_id가 없으면 아예 안되게 막아준다.
      return;
    }

    const commentDB = db.collection("comment");

    commentDB.where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then(docs => {
        let list = [];

        docs.forEach((doc) => {
          list.push({...doc.data(), id: doc.id})
        });

        dispatch(setComment(post_id, list))
      }).catch(err => {
        console.log("comment를 가져올수 없어!!!", err)
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) => produce(state, draft => {
      draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, draft => {}),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
