import React from "react";
import styled from "styled-components";

const Input = props => {
  const { height, _onChange, type } = props;

  const styles = {
    height: height,
  };
  return (
    <>
      <Label>{props.label}</Label>
      <InputBox
        type={type}
        placeholder={props.placeholder}
        onChange={_onChange}
        {...styles}
      ></InputBox>
    </>
  );
};

Input.defaultProps = {
  children: null,
  type: "text",
  width: "100%",
  height: "45px",
  padding: "18px 10px",
  margin: false,
  _onChange: () => {},
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
