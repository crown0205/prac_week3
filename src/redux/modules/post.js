import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import moment from "moment";

import { db, storage } from "../../shared/firebase";
import { actionCreators as imageAction } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";  

const setPost = createAction(SET_POST, (post_list, paging) => ({ post_list, paging }));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, is_loading => ({ is_loading })); // loading 중인지 체크 하기 위해서.

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 }, //시작점을 정해주고 다음 가져올 정보를 담아준다. size는 몇개를 가져올건지 정하는건다.
  is_loading: false, // 현재 paging 중인지 아닌지 판별하는 것.
};    // 초기값으로 넣어 놔 버렸네;;; ㅡㅡ

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

    console.log(_post);

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
                                    // ⬇ 무한스크롤할때 가져올 갯수.
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    
    let _paging = getState().post.paging; // 📍값을 가져오는데... 값이 무엇인지 정확히 알수 없다... 이럴때 어떻게 하면서 작업을 해야되는지... 

    if(_paging.start && !_paging.next){   // start의 값이 있으면서 next의 값이 없으면 그냥 작동하지마...
      return;                             // next === 마지막 item의 다음 값이 없는걸 이야기함.
    }
    
    dispatch(loading(true)); // 함수가 실행 되자 마자 바로 바꿔줘도 되고, 아니면  " query = postDB.orderBy("insert_dt","desc").limit(4); " 이 밑에서 해줘도 된다.

    const postDB = db.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");
    // limit(4)에서 "4"인 이유는 위에 size라는 값으로 불러올때 3개씩 불러오라고 할껀데, 여기서 4개씩 불러들이면 list의 마지막에 다았을때 item이 있는지 없는지 유무를 체크 할수 있어서이다.

    if (start) {// 불러올 처음 값이 있다면 그 처음 값부터 시작하라고 지정해주는 거다.
    
      // query.startAt(start); // query에다가 query를 대치 해줘야되는데, 그렇게 안해줘서 같은게 계속 반복되서 출력되므로써, 같은 key를 가진 다는 에러가 발생!!!
      query = query.startAt(start);
    }

    query
      .limit(size + 1) // limit은 여기 써줘야됨.
      .get()
      .then(docs => {
        let post_list = [];

        let paging = {// 다음 정보를 가져오기 전에 있는지 체크 유무하기.
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1] // 이 부분 이해가 잘안된다... length에서 -1을 했는데 4번째??
              : null,
          size: size,
        };

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
        });

        post_list.pop(); // 마지막 들어가는 요소를 없애주는 거다. 여기서는 4번째로 들어가는 요소를 없애주는거다.
                         // size + 1 로 4개씩 불러서 다음 요소가 있는지 체크 하는거닌깐.. 마지막 요소를 로딩해주지 않게 pop()으로 제거한다.

        dispatch(setPost(post_list, paging));
      });

    return;

    postDB.get().then(docs => {
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
        // draft.list = action.payload.post_list;// 지금은 post를 추가해주는게 아니라 바꿔 끼워주고 있는거다.

        draft.list.push(...action.payload.post_list) // "...action.payload.post_list" 에서 "..." 해줘야지 하나하나씩 다 들어간다.
        draft.paging = action.payload.paging; // paging 하는 중인지 체크?? 값 체크해보기!!
        draft.is_loading = false; // paging 이 실행이 끝나니 작동상태를 false로 바꿔서 다시 이벤트가 일어날수 있게 해준다.
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
};

export { actionCreators };
