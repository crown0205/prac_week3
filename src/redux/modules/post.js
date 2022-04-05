import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import moment from "moment";

import { db, storage } from "../../shared/firebase";
import { actionCreators as imageAction } from "./image";

const SET_POST = "SET_POST";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";

const setPost = createAction(SET_POST, post_list => ({ post_list }));
const getPost = createAction(GET_POST, post_list => ({ post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));

const initialState = {
  list: [],
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "bingi",
  //   user_profile:
  //     "https://i.pinimg.com/564x/6d/45/81/6d45817cbb8691cb1ce4e2c3b2357c65.jpg",
  // },
  image_url:
    "https://i.pinimg.com/564x/a2/fa/50/a2fa50e5c6eb5e3324c90b7f044c597e.jpg",
  contents: "",
  comment_cnt: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = db.collection("post");
    const _user = getState().user.user;

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    const _image = getState().image.preview;
    console.log(typeof _image);

    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");

    _upload.then(snapshot => {
      snapshot.ref
        .getDownloadURL()
        .then(url => {
          console.log("url : ", url);
          return url;
        })
        .then(url => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then(doc => {
              let post = { user_info, ...post, id: doc.id, image_url: url };
              dispatch(addPost(post));

              dispatch(imageAction.setPreview(null))
            })
            .catch(err => {
              history.push("/");
              window.alert("post 작성에 실패했어요...ㅜㅜ");
              console.log("post 작성에 실패했어요...ㅜㅜ", err);
            });
        }).catch((err)=> {
          window.alert("앗! 이미지 업로드에 문제 생김");
          console.log("앗! 이미지 업로드에 문제 생김", err)
        })
    });

    console.log("_upload : ", _upload);
    console.log("addPostFB 데이더 저장중!!!!");
  };
};

const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = db
      .collection("post")
      .get()
      .then(docs => {
        let post_list = [];
        docs.forEach(doc => {

          //어려운 버전
          let _post = doc.data();

          // ['comment_cnt', 'contents', ...]
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );

          post_list.push(post);

          // 쉬운버전
          // let _post = {
          //   id: doc.id,
          //   ...doc.data(),
          // };

          // let post = {
          //   id: doc.id,
          //   user_info: {
          //     user_name: _post.user_name,
          //     user_profile: _post.user_profile,
          //   },
          //   image_url: _post.image_url,
          //   contents: _post.contents,
          //   comment_cnt: _post.comment_cnt,
          //   insert_dt: _post.insert_dt,
          // };

          // post_list.push(post);
        });

        dispatch(setPost(post_list));
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.post_list;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post); // 배열의 맨앞에 붙이기 위해 unshift를 사용함. immer 때문에 불변성 신경 안쓰고 함수사용한다...!??
      }),
  },
  initialState
);

const actionCreators = {
  getPostFB,
  setPost,
  addPost,
  addPostFB,
};

export { actionCreators };
