// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1WaPhblL23jJZBib1qMAg55fHFVXa3Ro",
  authDomain: "productdevelopment-cffa5.firebaseapp.com",
  databaseURL: "https://productdevelopment-cffa5-default-rtdb.firebaseio.com",
  projectId: "productdevelopment-cffa5",
  storageBucket: "productdevelopment-cffa5.appspot.com",
  messagingSenderId: "73884901939",
  appId: "1:73884901939:web:576591c50bc57d36a03946",
  measurementId: "G-ZKBYG6JZKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app);
export const fireStorage = getStorage(app)

export default app