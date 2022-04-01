import React from "react";
import styled from "styled-components";

const Input = props => {
  const { height } = props;

  const styles = {
    height: height,
  };
  return (
    <>
      <Label>{props.label}</Label>
      <InputBox placeholder={props.placeholder} {...styles}></InputBox>
    </>
  );
};

Input.defaultProps = {
  children: null,
  width: "100%",
  height: "45px",
  padding: "18px 10px",
  margin: false,
};

const Label = styled.label`
  display: inline-block;
`;

const InputBox = styled.input`
  display: inline-block;
  width: 100%;
  margin: auto;
  height: ${props => props.height};
  font-size: 16px;
`;

export default Input;
