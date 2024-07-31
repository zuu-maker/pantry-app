// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyLJz1vBnmfGqvLcMPNRAd0q9BLwr6QwY",
  authDomain: "pantry-app-d11f5.firebaseapp.com",
  projectId: "pantry-app-d11f5",
  storageBucket: "pantry-app-d11f5.appspot.com",
  messagingSenderId: "672238709457",
  appId: "1:672238709457:web:6688186558bc9ebd83b3f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
