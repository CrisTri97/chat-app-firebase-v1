import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBL8QZyogNL0Y9L3u0gwyN0zUBCChNdhnY",
  authDomain: "chat-app-7f989.firebaseapp.com",
  projectId: "chat-app-7f989",
  storageBucket: "chat-app-7f989.appspot.com",
  messagingSenderId: "743312469905",
  appId: "1:743312469905:web:6449b19e18191505ebf430",
  measurementId: "G-GHREBTJ85L",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost", "8080");
}

export { db, auth };
export default firebase;
