import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = props => {
  const { width, height, _onChange, type, placeholder, label } = props;

  const styles = {
    height: height,
    width: width,
  };

  return (
    <>
      <Grid>
        <Label>{label}</Label>
        <InputBox
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          {...styles}
        ></InputBox>
      </Grid>
    </>
  );
};

Input.defaultProps = {
  children: null,
  type: "text",
  _onChange: () => {},
  height: "45px",
  // padding: "18px 16px",
  margin: false,
};

const Label = styled.label`
  display: inline-block;
`;

const InputBox = styled.input`
  display: inline-block;
  width: ${props => (props.width ? props.width : "100%")};
  margin: auto;
  height: ${props => props.height};
  font-size: 16px;
`;

export default Input;
