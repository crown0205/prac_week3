import React from "react";

import { Grid, Input, Button } from "../elements";

const CommentWrite = () => {

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Input width="98%" placeholder="댓글 내용 작성 해주세요~" />
        <Button width="100%" margin="10px 2px 0px 2px">작성</Button>
      </Grid>
    </React.Fragment>
  )
} 

export default CommentWrite;