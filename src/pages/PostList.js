// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = props => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list); //리덕스에서 값을 받아와서 map으로 돌려 item이 있는 만큼 출력해준다. 지금은 빈배열만 있어서 빈화면만 나온다.

  console.log(post_list);

  React.useEffect(() => {         // 밑의 조건을 붙이지 않으면, 메인화면으로 이동시 getpost를 해버려서, 순서가 뒤죽박죽이 된다.
    if (post_list.length === 0) { // 포스트 리스트 length로 0일때만 불러오도록 하면 postWrite 하고 메인으로 올때 getPost를 하지않아 맨 위로 방금 작성한 게시물이 올라오는거 같다.
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      {post_list.map((postItem, index) => {
        return <Post key={postItem.id} {...postItem} />;
      })}
    </React.Fragment>
  );
};

export default PostList;
