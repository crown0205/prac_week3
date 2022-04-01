import React from "react";
import { Grid, Text, Button } from "../elements/index";

const Header = props => {
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text bold size="24px">
            Hello
          </Text>
        </Grid>

        <Grid is_around>
          <Button margin="0px 10px" fontW="600">
            Signup
          </Button>
          <Button fontW="600">Login</Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
