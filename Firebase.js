// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZWu2xj8KFLUtyWsYsWMpVqYpgOeXDf-k",
  authDomain: "algocheatsheet.firebaseapp.com",
  projectId: "algocheatsheet",
  storageBucket: "algocheatsheet.appspot.com",
  messagingSenderId: "43690524103",
  appId: "1:43690524103:web:89118f01884d1ca2796de2",
};

// Initialize Firebase
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// init services
const db = getFirestore(app);
export { db, auth, provider };
// collection references
