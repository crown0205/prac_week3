import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Text, Button } from "../elements/index";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = props => {
  const history = useHistory();
  const dispatch = useDispatch()
  const is_login =useSelector((state)=> state.user.is_login)


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
            dispatch(userActions.logOut({}))
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
