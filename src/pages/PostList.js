// PostList.js
import React from "react";
import { useSelector } from "react-redux";

import Post from "../components/Post";

const PostList = props => {
  const post_list = useSelector(state => state.post.list); //리덕스에서 값을 받아와서 map으로 돌려 item이 있는 만큼 출력해준다. 지금은 빈배열만 있어서 빈화면만 나온다.

  return (
    <React.Fragment>
      {post_list.map((postItem, index) => {
        return <Post key={postItem.id} {...postItem} />;
      })}
    </React.Fragment>
  );
};

export default PostList;
