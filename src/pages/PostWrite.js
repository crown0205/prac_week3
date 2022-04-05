import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../redux/modules/post";

const PostWrite = props => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);

  const { history } = props;

  const [contents, setContents] = React.useState("");

  const changeContents = e => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(actionCreators.addPostFB(contents));
    // history.push("/")
  };

  if (!is_login) {
    return (
      <Grid padding="16px" margin="100px 0" center>
        <Text bold size="32px">
          앗! 잠깐!! 멈춰봐!!!
        </Text>
        <Text bold size="16px">
          로그인 후에만 글을 쓸수 있다구~!
        </Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
          text="로그인하러가기!"
          margin="50px 0 0 0"
          width="80%"
        />
      </Grid>
    );
  }
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

        <Image shape="rectangle" src={preview ? preview : "https://via.placeholder.com/400x300"} />
      </Grid>

      <Grid padding="16px">
        <Input
          label="게시글 내용"
          placeholder="게시글 작성"
          _onChange={changeContents}
        />
      </Grid>

      <Grid padding="16px">
        <Button text="게시글 작성" _onClick={addPost} />
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
