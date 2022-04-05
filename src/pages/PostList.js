// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = props => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);

  React.useEffect(() => {
    if (post_list.length === 0) {
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
