import React from "react";
import { Text, Grid, Button, Input } from "../elements/index";

const Login = props => {
  return (
    <React.Fragment>
      <Grid padding="16px" textAlign="center">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
          <Input label="아이디" placeholder="아이디를 입력해주세요." height="40px"/>
        </Grid>

        <Grid padding="16px 0px">
          <Input label="패스워드" placeholder="패스워드 입력해주세요." height="40px"/>
        </Grid>

        <Button text="로그인하기" width="100%" height="50px" border="none" bg="black" color="#fff" fontW="600" margin="50px 0px" />
      </Grid>
    </React.Fragment>
  );
};

export default Login;
