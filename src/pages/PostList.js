// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../components/Post";
import { Grid } from "../elements";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = props => {
  const dispatch = useDispatch();
  const user_info = useSelector(state => state.user.user);

  // const post_list = useSelector(state => state.post.list);
  // const is_loading = useSelector(state => state.post.is_loading);
  // const paging = useSelector(state => state.post.paging);

  const { list, is_loading, paging } = useSelector(state => state.post);
  const { history } = props;

  React.useEffect(() => {
    if (list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid
        // bg={"#eff6ff"}
        padding="40px 0 20px 0"
      >
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
            console.log("next!");
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {list.map((postItem, index) => {
            if (postItem.user_info.user_id === user_info?.uid) {
              // is_me <== user_info로 판별함.
              return (
                <Grid
                  // bg={"#fff"}
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
                  // bg={"#fff"}
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
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
