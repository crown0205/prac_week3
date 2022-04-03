import React from "react";
import styled from "styled-components";

const Button = props => {
  const { fontW, width, height, margin, bg, color, border, is_float } = props;

  const styles = {
    width: width,
    height: height,
    margin: margin,
    fontW: fontW,
    bg: bg,
    color: color,
    border: border,
  };

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={props._onClick}>{props.text}</FloatButton>
      </React.Fragment>
    );
  }

  return (
    <ButtonBox {...styles} onClick={props._onClick}>
      {props.text}
    </ButtonBox>
  );
};

Button.defaultProps = {
  children: null,
  is_float: false,
  width: "40%",
  height: "30px",
};

const ButtonBox = styled.button`
  color: ${props => props.color};
  width: ${props => props.width};
  height: ${props => props.height};
  font-weight: ${props => props.fontW};
  ${props => (props.bg ? `background: ${props.bg};` : "")}
  ${props => (props.margin ? `margin: ${props.margin};` : "")}
  ${props => (props.border ? `border: ${props.border};` : "")}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 50px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50%;
`;

export default Button;
