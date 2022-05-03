/** @format */

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_ID,
  authDomain: "shoestore-7b48b.firebaseapp.com",
  projectId: "shoestore-7b48b",
  storageBucket: "shoestore-7b48b.appspot.com",
  messagingSenderId: "54476501875",
  appId: process.env.REACT_APP_FIREBASE_API,
};

const app = initializeApp(firebaseConfig);

export default app;
