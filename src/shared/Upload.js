import React from "react";

import { Button } from "../elements";
import { storage } from "./firebase";

const Upload = props => {
  const fileInput = React.useRef(); // onChange를 하면 변하는 순간만 포착하기 때문에 ref로 변경되어 있는 그 값을 저장 버튼을 눌렀을때 접근할수 있도록 만든것이다.

  const selectFile = e => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.files[0]);

    console.log(fileInput.current.files[0]);
  };

  const uploadFB = () => {
    let image = fileInput.current.files[0];
    const _upload = storage.ref(`images/${image.name}`).put(image);

    _upload.then(snapshot => {
      console.log(snapshot);

      snapshot.ref.getDownloadURL().then((url) => {
        console.log(url)
      })
    });
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} ref={fileInput} />
      <Button text="업로드하기" _onClick={uploadFB} />
    </React.Fragment>
  );
};

export default Upload;
