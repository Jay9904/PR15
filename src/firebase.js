// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByApHM0yyQ3uTfwFXjvHHVGb1Ey4HsvT8",
    authDomain: "pr-fds.firebaseapp.com",
    projectId: "pr-fds",
    storageBucket: "pr-fds.appspot.com",
    messagingSenderId: "684674854288",
    appId: "1:684674854288:web:717ec7264b41ea48401715"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
export default database;