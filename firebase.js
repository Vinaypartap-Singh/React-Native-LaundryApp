// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsiAJNEqZZZPEJMgp_9rS2zPRYc_JNxLc",
  authDomain: "laundry-app-rn.firebaseapp.com",
  projectId: "laundry-app-rn",
  storageBucket: "laundry-app-rn.appspot.com",
  messagingSenderId: "584780116519",
  appId: "1:584780116519:web:9dc5b96fe997694f1ed402",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
