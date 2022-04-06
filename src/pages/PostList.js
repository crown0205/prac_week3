// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/Post";
import { Grid } from "../elements";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = props => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);
  const user_info = useSelector(state => state.user.user);
  const is_loading = useSelector(state => state.post.is_loading);
  const paging = useSelector(state => state.post.paging);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll
        callNext={() => {
          dispatch(postActions.getPostFB(paging.next));
          console.log("next!");
        }}
        is_next={paging.next ? true : false}
        loading={is_loading}
      >
        {post_list.map((postItem, index) => {
          if (postItem.user_info.user_id === user_info?.uid) {
            return (
              <Grid
                key={postItem.id}
                _onClick={() => {
                  history.push(`/post/${postItem.id}`);
                }}
              >
                <Post {...postItem} is_me />
              </Grid>
            );
          } else {
            return (
              <Grid
                key={postItem.id}
                _onClick={() => {
                  history.push(`/post/${postItem.id}`);
                }}
              >
                <Post {...postItem} />
              </Grid>
            );
          }
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};

export default PostList;
