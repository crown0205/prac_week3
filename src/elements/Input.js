import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = props => {
  const { width, height, _onChange, type, placeholder, label, value } = props;

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
          value={value ? value : ""}
          placeholder={placeholder}
          onChange={_onChange}
          {...styles}
        ></InputBox>
        {/* <ElInput type={type} placeholder={placeholder} onChange={_onChange} /> */}
      </Grid>
    </>
  );
};

Input.defaultProps = {
  children: null,
  type: "text",
  _onChange: () => {},
  height: "45px",
  margin: false,
  value: "",
};

const Label = styled.label`
  display: inline-block;
`;

const InputBox = styled.input`
  width: ${props => (props.width ? props.width : "100%")};
  margin: auto;
  height: ${props => props.height};
  font-size: 16px;
`;

// const ElInput = styled.input`	
// border: 1px solid #212121;	
// width: 100%;	
// padding: 12px 4px;	
// box-sizing: border-box;	
// `

export default Input;
