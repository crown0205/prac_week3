import React from "react";
import Post from "../components/Post"
import CommentList from "../components/CommentList"
import CommentWrite from "../components/CommentWrite"

import { useSelector } from "react-redux";

// 상세 페이지 에서 새로고침 시 리덕스 데이터가 다 날아가 파이어베이스에서 데이터를 불러오게 한다.
import { db } from "../shared/firebase" 
import post from "../redux/modules/post";

const PostDetail = props => {
  const id = props.match.params.id // url에서 post의 id 값 가져오기
  console.log(id)

  const user_info = useSelector(state => state.user.user);

  const post_list =useSelector((state)=>state.post.list)  // post 리덕스에서 저장되있는 값 불러오기
  console.log(post_list) 

  const post_index = post_list.findIndex(item => item.id === id) // 몇번째의 post item인지 찾는거.
  console.log(post_index)

  const post_data = post_list[post_index]  // 내가 들어간 상세페이지의 post item의 정보만 찾기
  console.log(post_data)

  console.log(post_data.user_info.user_id) // 리덕스에 저장되어 있는 유저정보
  console.log(user_info.uid)  // 유저가 가지고 있는 유저정보

  const [post, setPost] = React.useState(post_data ? post_data : null) // 초기값은 post item의 정보를 넣어줌.
  // 딘일 데이터 같은 경우에는 setState로 관리를 할 수도 있고, 리덕스로 정보를 옮긴뒤 리덕스로 관리를 해도 된다.
  // 여기서는 state로 관리를 할것이다.

  React.useEffect(()=>{

    if(post){ // 리덕스에 post 데이터가 있으면 굳이 파이어 베이스에서 데이터를 불러올 필요가 없으니 이렇게 끝내준다.
      return;
    }
    const postDB = db.collection("post");
    postDB.doc(id).get().then(doc => {  // 파이어 베이스 스토어에서 파라미터로 받은 post id 값으로 그 데이터를 조회해서 온다.
      console.log(doc);
      console.log(doc.data()); //  상세페이지의 데이터 하나만 잘 불러짐.

      let _post = doc.data() //  상세페이지의 데이터를 변수로 지정

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

      setPost(post);

    })

    
  },[]);

  return (
    <React.Fragment>
      {/* "...post" 하면 post item의 정보가 들어가는거다.. <== setState의 있는 post!! */}
      {post && <Post {...post} is_me={post.user_info.user_id === user_info.uid} />}
      {/* ⬆ post 정보가 있을때만 post 정보가 화면에 보여지게 한다. */}
      <CommentWrite/>
      <CommentList/>
    </React.Fragment>
  )
}

export default PostDetail;