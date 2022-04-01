import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Text, Button } from "../elements/index";

const Header = props => {
  const history = useHistory();

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
