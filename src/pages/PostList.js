// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = props => {
  const dispatch = useDispatch();
  const post_list = useSelector(state => state.post.list);
  const user_info = useSelector(state => state.user.user);
  const is_loading = useSelector(state => state.post.is_loading);
  const paging = useSelector(state => state.post.paging);

  // ⬆ 📍 같은 post에서 불러오는 값인데 이럴때 어떻게 한번에 묶어서 불러오는지??

  // const { post_list, is_loading, paging } = useSelector(state=>state.post)

  // console.log('-----------------------------')
  // console.log(post_list)
  // console.log(is_loading)
  // console.log(paging)
  // console.log('-----------------------------')

  React.useEffect(() => {
    if (post_list.length === 0) {
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <InfinityScroll  // 무한 스크롤 적용하기
        callNext= {()=>{
          dispatch(postActions.getPostFB(paging.next)) // 다음항목들 불러오는 함수
          console.log("next!")
        }}
        is_next={paging.next? true : false}
        loading={is_loading}
        >  
        {post_list.map((postItem, index) => {
          if (postItem.user_info.user_id === user_info?.uid) {
            return <Post key={postItem.id} {...postItem} is_me />;
          } else {
            return <Post key={postItem.id} {...postItem} />;
          }
        })}
      </InfinityScroll>
    </React.Fragment>
  );
};

export default PostList;
