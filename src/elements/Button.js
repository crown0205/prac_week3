import React from "react";
import styled from "styled-components";

const Button = props => {

  const { fontW,width, height, margin ,bg, color, border } = props;

  const styles = {
    width: width,
    height: height,
    margin: margin,
    fontW: fontW,
    bg:bg,
    color:color,
    border:border,
  };

  return <ButtonBox {...styles} onClick={props._onClick}>{props.text}</ButtonBox>;
};

Button.defaultProps = {
  children: null,
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
  /* border:none; */
  ${props => (props.border ? `border: ${props.border};` : "")}
`;

export default Button;
