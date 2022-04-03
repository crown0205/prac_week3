import firebase from "firebase/app";
import "firebase/auth";

// export const apiKey = "AIzaSyBKXW8u8z6LS3T-BOCMsuUMFsJOdsrL468" //이렇게 apiKey 값을 내보는 방법도 있다.

const firebaseConfig = {
  // apiKey: apiKey,                                              //  위에 연결해서 이렇게 하는 방법
  apiKey: "AIzaSyBKXW8u8z6LS3T-BOCMsuUMFsJOdsrL468",
  authDomain: "prac-react02.firebaseapp.com",
  projectId: "prac-react02",
  storageBucket: "prac-react02.appspot.com",
  messagingSenderId: "996086079370",
  appId: "1:996086079370:web:b2fcdf2e781d4fa3317273",
  measurementId: "G-0RJR1MC1VT",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey //apikey값을 밖으로 내보는 방법
const auth = firebase.auth();

export { auth , apiKey }; // apikey 값 밖으로 전송
