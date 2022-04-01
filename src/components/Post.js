import React from "react";

const Post = (props)  =>{

  return (
    <React.Fragment>
      <div>user profile/ user name / insert_dt / is_me (edit btn)</div>
      <div>contents</div>
      <div>image</div>
      <div>comment cnt</div>
    </React.Fragment>
  )
}

Post.defaultProps = {
  user_info: {
    user_name: "bingi",
    user_profile: "https://i.pinimg.com/564x/a2/fa/50/a2fa50e5c6eb5e3324c90b7f044c597e.jpg"
  },
  image_url: "https://i.pinimg.com/564x/a2/fa/50/a2fa50e5c6eb5e3324c90b7f044c597e.jpg",
  contents: "사람이오",
  comment_cnt: 10,
  insert_dt: "2022-03-31 12:14:32"
}

export default Post;