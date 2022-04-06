import React from "react";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = props => {
  const dispatch = useDispatch()
  const id = props.match.params.id;

  const user_info = useSelector(state => state.user.user);
  const post_list = useSelector(state => state.post.list);
  const post_index = post_list.findIndex(item => item.id === id);
  const post = post_list[post_index];

  React.useEffect(() => {
    if (post) {
      return;
    }
    
    dispatch(postActions.getOnePostFB(id))
  }, []);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <CommentWrite post_id={id} />
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
