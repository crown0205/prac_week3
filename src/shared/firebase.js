import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKXW8u8z6LS3T-BOCMsuUMFsJOdsrL468",
  authDomain: "prac-react02.firebaseapp.com",
  projectId: "prac-react02",
  storageBucket: "prac-react02.appspot.com",
  messagingSenderId: "996086079370",
  appId: "1:996086079370:web:b2fcdf2e781d4fa3317273",
  measurementId: "G-0RJR1MC1VT",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };
