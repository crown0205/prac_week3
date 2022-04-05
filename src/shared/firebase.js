import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxewNVSjdQtxQyyk--aO0nIXkzCLyI7yE",
  authDomain: "new-project-529b8.firebaseapp.com",
  projectId: "new-project-529b8",
  storageBucket: "new-project-529b8.appspot.com",
  messagingSenderId: "229147759909",
  appId: "1:229147759909:web:402055b75358e4ecca76cc",
  measurementId: "G-GECBE7CN83",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, db, storage };

// 1) 새로만든거

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBxewNVSjdQtxQyyk--aO0nIXkzCLyI7yE",
//   authDomain: "new-project-529b8.firebaseapp.com",
//   projectId: "new-project-529b8",
//   storageBucket: "new-project-529b8.appspot.com",
//   messagingSenderId: "229147759909",
//   appId: "1:229147759909:web:402055b75358e4ecca76cc",
//   measurementId: "G-GECBE7CN83"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// 2) 예전꺼

// apiKey: "AIzaSyBKXW8u8z6LS3T-BOCMsuUMFsJOdsrL468",
//   authDomain: "prac-react02.firebaseapp.com",
//   projectId: "prac-react02",
//   storageBucket: "prac-react02.appspot.com",
//   messagingSenderId: "996086079370",
//   appId: "1:996086079370:web:b2fcdf2e781d4fa3317273",
//   measurementId: "G-0RJR1MC1VT"
