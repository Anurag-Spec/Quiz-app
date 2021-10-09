import firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhqSLqvBhdlNjTV1tDUmNIXAkKJ1pdPio",
  authDomain: "quiz-app-23324.firebaseapp.com",
  projectId: "quiz-app-23324",
  storageBucket: "quiz-app-23324.appspot.com",
  messagingSenderId: "276253502318",
  appId: "1:276253502318:web:5464f631c50e368e07ef7f",
};

firebase.initializeApp(firebaseConfig);

export const auth = getAuth();
