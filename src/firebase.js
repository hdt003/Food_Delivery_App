//firebase
//////////////////////////////////////////////////////////////////////////////
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-76gTNwZtcXa7jQXsiqA-4hgL8O28ih4",
  authDomain: "menu-app-23c0c.firebaseapp.com",
  projectId: "menu-app-23c0c",
  storageBucket: "menu-app-23c0c.appspot.com",
  messagingSenderId: "685469299242",
  appId: "1:685469299242:web:8d8f387e3b3f130a5dc953",
  measurementId: "G-N4VR7VGSEH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//////////////////////////////////////////////////////////////////////////////

export {app,auth,db}