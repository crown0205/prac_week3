import React from "react";
import styled from "styled-components"

const Image = props => {
  const { shape, src, size} = props;

  const styles = {
    src: src,
    size: size,
  }

  if(shape === "circle"){
    return (
      <ImageCircle {...styles}></ImageCircle>
    )
  }
  return (
    <React.Fragment>

    </React.Fragment>  
  )
}

Image.defaultProps = {
  shape: "circle",
  src: "https://i.pinimg.com/564x/a2/fa/50/a2fa50e5c6eb5e3324c90b7f044c597e.jpg",
  size: 36,
}

const ImageCircle = styled.div`
  --size: ${(props)=> props.size}px;
  width:  var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props)=>props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;