import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = props => {
  const dispatch = useDispatch();
  const is_login = useSelector(state => state.user.is_login);
  const preview = useSelector(state => state.image.preview);
  const post_list = useSelector(state => state.post.list);

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find(item => item.id === post_id) : null;

  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.replace("/");

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = e => {
    setContents(e.target.value);
  };

  const addPost = () => {
    dispatch(postActions.addPostFB(contents));
    // history.push("/")
  };

  const editPost = () => {
    console.log("editPost : ", post_id, contents)
    dispatch(postActions.editPostFB(post_id, {contents: contents}))
  }

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
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
      </Grid>

      <Grid padding="16px">
        <Upload />
        <Grid margin="0px" size="24px" bold>
          <Text>미리보기</Text>
        </Grid>

        <Image
          shape="rectangle"
          src={preview ? preview : "https://via.placeholder.com/400x300"}
        />
      </Grid>

      <Grid padding="16px">
        <Input
          value={contents}
          label="게시글 내용"
          placeholder="게시글 작성"
          _onChange={changeContents}
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost} />
        ) : (
          <Button text="게시글 작성" _onClick={addPost} />
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
