// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2lY0aBbscEFboYkNEbC082rSiVMSlrnw",
  authDomain: "dcf-viewer.firebaseapp.com",
  projectId: "dcf-viewer",
  storageBucket: "dcf-viewer.appspot.com",
  messagingSenderId: "173731336635",
  appId: "1:173731336635:web:1d7b208434fa6378e9749e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
