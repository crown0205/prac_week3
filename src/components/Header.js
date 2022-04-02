import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Text, Button } from "../elements/index";
import { getCookie, deleteCookie } from "../shared/Cookie";

const Header = props => {
  const history = useHistory();
  const [is_login, setIsLogin]  = React.useState(false)

  React.useEffect(() => {
    let cookie = getCookie("user_id")
    console.log(cookie)

    if(cookie) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  },[])

  if(is_login){
    return (
      <Grid is_flex padding="4px 16px">
      <Grid>
        <Text bold size="24px" _onClick={()=>{
            history.push("/");
        }}>
          Hello
        </Text>
      </Grid>
  
      <Grid is_around>
        <Button
          margin="0px 10px"
          fontW="600"
          text="내정보"
          _onClick={() => {
            history.push("/signup");
          }}
        />
        <Button
          margin="0px 10px"
          fontW="600"
          text="알림"
          _onClick={() => {
            history.push("/signup");
          }}
        />
        <Button
          fontW="600"
          text="로그아웃"
          _onClick={() => {
            deleteCookie("user_id")
            history.push("/login");
          }}
        />
      </Grid>
    </Grid>
    )
  }
  

  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text bold size="24px" _onClick={()=>{
              history.push("/");
          }}>
            Hello
          </Text>
        </Grid>

        <Grid is_around>
          <Button
            margin="0px 10px"
            fontW="600"
            text="Signup"
            _onClick={() => {
              history.push("/signup");
            }}
          />
          <Button
            fontW="600"
            text="Login"
            _onClick={() => {
              history.push("/login");
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
