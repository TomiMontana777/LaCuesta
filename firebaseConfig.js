// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQzprYjXm8vlXFCDRv5xxr2tI4zZl5WNo",
    authDomain: "proyectodm-ca511.firebaseapp.com",
    projectId: "proyectodm-ca511",
    storageBucket: "proyectodm-ca511.appspot.com",
    messagingSenderId: "557518377333",
    appId: "1:557518377333:web:b7390b7c847d34d1d0433c"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);

export default appFireBase