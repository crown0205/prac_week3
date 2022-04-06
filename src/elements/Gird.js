import React from "react";
import styled from "styled-components";

const Grid = props => {
  const {
    is_flex,
    is_around,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    border1,
    border2,
    _onClick,
  } = props;

  const styles = {
    is_flex: is_flex,
    is_around: is_around,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    border1,
    border2,
  };
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  border1: false,
  border2: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${props => props.width};
  height: 100%;
  box-sizing: border-box;
  ${props => (props.padding ? `padding: ${props.padding};` : "")}
  ${props => (props.margin ? `margin: ${props.margin};` : "")}
  ${props => (props.bg ? `background-color: ${props.bg};` : "")}
  ${props =>
    props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between; `
      : ""};
  ${props =>
    props.is_around
      ? `display: flex; align-items: center; justify-content: center; `
      : ""};
  ${props => (props.center ? `text-align: center;` : "")};
  ${props => (props.border1 ? `border: 1px solid #aaa;` : "")}
  ${props => (props.border2 ? `border: 2px solid #aaa;` : "")}
`;

export default Grid;
