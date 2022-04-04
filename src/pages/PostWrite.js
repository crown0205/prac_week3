import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

const PostWrite = props => {
  return (
    <React.Fragment>
      <Grid padding="20px 16px 0">
        <Text margin="0px" size="30px" bold>
          게시글 작성
        </Text>
      </Grid>

      <Grid padding="16px">
        <Upload />
        <Grid margin="0px" size="24px" bold>
          <Text>미리보기</Text>
        </Grid>

        <Image shape="rectangle" />
      </Grid>

      <Grid padding="16px">
        <Input label="게시글 내용" placeholder="게시글 작성" />
      </Grid>

      <Grid padding="16px">
        <Button text="게시글 작성" />
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
