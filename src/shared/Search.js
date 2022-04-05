import React from "react";
import _ from "lodash";

const Search = () => {

  const [text, setText] = React.useState("")

  const onChange = (e) => {
    // keyPress(e)
  }
  console.log(text)

// debounce 기능
  const debounce = _.debounce((e) => {
    console.log("debounce :::::",e.target.value);
  }, 1000);
//  throttle 기능
  const throttle = _.throttle((e) => {
    console.log("throttle :::::",e.target.value)
  }, 1000)

  const keyPress = React.useCallback(debounce, [])  // <== 되게 중요한 친구다!!! 
  // useCallback은 React.useCallback(여기 함수, []) 들어간 함수가 변경될때마다 그걸 저장? 해주는 친구이다.. 
  // 리랜더링이 있어나도 useCallback 안의 값은 변하지 않는다!!


  return (
    <div>
      <input type="text" onChange={onChange} />
    </div>
  );
};

export default Search;
