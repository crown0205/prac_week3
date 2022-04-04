import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = () => {
  return(
    <React.Fragment>
      <Grid>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
        <CommentItem/>
      </Grid>
    </React.Fragment>
  )
}

const CommentItem = props => {

  const { user_profile, user_name, user_id, post_id, contents, insert_dt } = props;
  return (
    <Grid is_flex padding="0 16px">
      <Grid is_flex width="auto">
        <Image shape="circle"/>
        <Text bold>aaa{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0 4px">
        <Text margin="0">{contents}</Text>
        <Text margin="0">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
}

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: '2021-01-01 19:00:00'
}

export default CommentList;