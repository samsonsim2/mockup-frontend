// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd0DQRiedhgoTmwHJNA16KsWL_fdxbgZ0",
  authDomain: "mockup-390da.firebaseapp.com",
  projectId: "mockup-390da",
  storageBucket: "mockup-390da.appspot.com",
  messagingSenderId: "1055857726672",
  appId: "1:1055857726672:web:650f87f7eee0b3b561fad5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)