import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBPsjf25PD9xTfpNzWU7n17k5IfLKC5-tk",
  authDomain: "mooveo-assigment.firebaseapp.com",
  projectId: "mooveo-assigment",
  storageBucket: "mooveo-assigment.firebasestorage.app",
  messagingSenderId: "356736048973",
  appId: "1:356736048973:web:4c629b04aa9b81b41de104",
  measurementId: "G-P6JPEKW04D"
};

const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// ייצוא ה-Database להמשך המטלה
export const db = getFirestore(app);