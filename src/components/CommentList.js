import React from "react";
import { Grid, Image, Text } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

const CommentList = props => {
  const dispatch = useDispatch();
  const comment_list = useSelector(state => state.comment.list)
  const { post_id } = props;

  React.useEffect(() => {

    if(!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id))
    }
  },[])

  if(!comment_list[post_id] || !post_id) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[post_id].map( item => {
          return (<CommentItem key={item.id} {...item} />)
        } )}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id:null,

}

const CommentItem = props => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <Grid is_flex padding="0 16px">
      <Grid is_flex width="auto">
        <Image shape="circle" />
        <Text bold>aaa{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0 4px">
        <Text margin="0">{contents}</Text>
        <Text margin="0">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: "2021-01-01 19:00:00",
};

export default CommentList;
