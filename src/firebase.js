// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaEK-pBDhkY__9BNmIRx9WObcWoD48HLU",
  authDomain: "covid19-e1987.firebaseapp.com",
  databaseURL: "https://covid19-e1987.firebaseio.com",
  projectId: "covid19-e1987",
  storageBucket: "covid19-e1987.appspot.com",
  messagingSenderId: "1095511371721",
  appId: "1:1095511371721:web:41cf21e7be890fd514c218",
  measurementId: "G-9Z8VN63M6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
