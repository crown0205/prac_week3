import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import moment from "moment";

import { db, storage } from "../../shared/firebase";
import { actionCreators as imageAction } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, is_loading => ({ is_loading })); // loading 중인지 체크 하기 위해서.

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
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

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요~!!");
      return;
    }
    const _image = getState().image.preview;
    const _post_index = getState().post.list.findIndex(
      item => item.id === post_id
    );
    const _post = getState().post.list[_post_index];

    // console.log(_post);
    const postDB = db.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then(doc => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });

      return;
    } else {
      const user_id = getState().user.user.id;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
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
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then(doc => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch(err => {
            window.alert("앗! 이미지 업로드에 문제 생김");
            console.log("앗! 이미지 업로드에 문제 생김", err);
          });
      });
    }
  };
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
              let post = { user_info, ..._post, id: doc.id, image_url: url };
              dispatch(addPost(post));
              dispatch(imageAction.setPreview(null));
              history.push("/");
            })
            .catch(err => {
              window.alert("post 작성에 실패했어요...ㅜㅜ");
              console.log("post 작성에 실패했어요...ㅜㅜ", err);
            });
        })
        .catch(err => {
          window.alert("앗! 이미지 업로드에 문제 생김");
          console.log("앗! 이미지 업로드에 문제 생김", err);
        });
    });

    console.log("_upload : ", _upload);
    console.log("addPostFB 데이더 저장중!!!!");
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = db.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");
    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then(docs => {
        let post_list = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };

        docs.forEach(doc => {
          let _post = doc.data();
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
        });

        post_list.pop();
        dispatch(setPost(post_list, paging));
      });
  };
};

const getOnePostFB = id => {
  return function (dispatch, getState, { history }) {
    const postDB = db.collection("post");
    postDB
      .doc(id)
      .get()
      .then(doc => {
        // console.log(doc);
        // console.log(doc.data());

        let _post = doc.data();
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

          dispatch(setPost([post])) // 이 앞에다가 대괄호 하면 배열 안에다가 넣는거다.
      });
  };
};

//reducer
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.push(...action.payload.post_list);

        // 중복값 제거 하는 로직
        draft.list = draft.list.reduce((acc, cur) => { 
          console.log({acc,cur})
          console.log(acc.findIndex(item => item.id === cur.id))
          if(acc.findIndex(item => item.id === cur.id) === -1){ // findIndex 값이 "-1"이 나오면 중복되는 값이 없다는 소리이다.
            // 중복 되지 않은 경우
            console.log("중복 x")
                                  // "⬆" 이게 지금 현재 가지고 있는 포스트의 "id"이다. post.id와 현재의 가지고 있는 id와 같은지를 체크하는 로직
            return [...acc, cur]
          } else { 
            // 중복된 경우
            console.log("중복 ㅇ")
            acc[acc.findIndex(item => item.id === cur.id)] = cur;
            return acc;
          }
        }, [])


        if(action.payload.paging){
          draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, draft => {
        console.log("EDIT_POST : ", state, action);
        let index = draft.list.findIndex(
          item => item.id === action.payload.post_id
        );

        console.log("test", action.payload);

        draft.list[index] = { ...draft.list[index], ...action.payload.post };
      }),
    [LOADING]: (state, action) =>
      produce(state, draft => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getPostFB,
  setPost,
  addPost,
  addPostFB,
  editPost,
  editPostFB,
  getOnePostFB,
};

export { actionCreators };
