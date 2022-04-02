import React from "react";
import { Text, Grid, Button, Input } from "../elements/index";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

const Login = props => {

  console.log(getCookie('user_pwd'))
  const login = ()  => {
    setCookie("user_id", "bingo",3)
    setCookie("user_pwd", "pppp", 3)
  }
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

        <Button text="로그인하기" width="100%" height="50px" border="none" bg="black" color="#fff" fontW="600" margin="50px 0px" _onClick={()=>{
          console.log("버튼 눌림")
          deleteCookie("user_id")
          // login()
        }}/>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
