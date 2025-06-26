
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey:"AIzaSyA9U5e0pw931ZDaqX9ByG7mk7xVSOmEcdo",
  authDomain:"sriflix-mobile.firebaseapp.com",
  projectId:"sriflix-mobile",
  storageBucket:"sriflix-mobile.appspot.com",
  messagingSenderId:"775538472497",
  appId:"1:775538472497:web:8c736a8b36337e391e4710",
  measurementId:"G-YR79LC36K4"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
