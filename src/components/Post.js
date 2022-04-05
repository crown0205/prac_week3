import React from "react";
import { Grid, Image, Text } from "../elements/index";

const Post = props => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Grid border2 padding="16px">
          <Grid is_flex width="auto" border1 padding="10px">
            <Image shape="circle" src={props.user_info.user_profile} />
            <Text bold>{props.user_info.user_name}</Text>
            <Text>{props.insert_dt}</Text>
          </Grid>
          <Grid margin="16px 0 0 0">
            <Image shape="rectangle" src={props.image_url} />
          </Grid>
          <Grid is_flex width="auto" padding="16px">
            <Text>{props.contents}</Text>
          </Grid>
          <Grid padding="0 16px 16px">
            <Text bold>댓글 {props.comment_cnt}개</Text>
          </Grid>

          {/* <div>user profile/ user name / insert_dt / </div>
        <div>contents</div>
        <div>image</div>
      <div>comment cnt</div> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "bingi",
    user_profile:
      "https://i.pinimg.com/564x/6d/45/81/6d45817cbb8691cb1ce4e2c3b2357c65.jpg",
  },
  image_url:
    "https://i.pinimg.com/564x/a2/fa/50/a2fa50e5c6eb5e3324c90b7f044c597e.jpg",
  contents: "여기 콘텐츠 다아아아~~!!",
  comment_cnt: 10,
  insert_dt: "2022-03-31 12:14:32",
};

export default Post;
