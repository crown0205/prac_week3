import React from "react";

import { Button } from "../elements";
// import { storage } from "./firebase";

import { actionCreators as imageActions } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";

const Upload = props => {
  const dispatch = useDispatch();
  const is_uploading = useSelector(state => state.image.uploading);
  const fileInput = React.useRef(); // onChange를 하면 변하는 순간만 포착하기 때문에 ref로 변경되어 있는 그 값을 저장 버튼을 눌렀을때 접근할수 있도록 만든것이다.

  const selectFile = e => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);

    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = fileInput.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader)
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    console.log(image);
    dispatch(imageActions.uploadImageFB(image));
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
      <Button text="업로드하기" _onClick={uploadFB} />
    </React.Fragment>
  );
};

export default Upload;

// 3-7 09:30 Upload 버튼 눌렀을때 이벤트 관련 부분
