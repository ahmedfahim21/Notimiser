import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth' 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCd3-_4B2kiuw-tkgxFHHdXLMh5YZGaTLY",
    authDomain: "notimiser.firebaseapp.com",
    projectId: "notimiser",
    storageBucket: "notimiser.appspot.com",
    messagingSenderId: "797540227746",
    appId: "1:797540227746:web:345ac436edd9ccaafbd5fb",
    measurementId: "G-FQGW999F7Q"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()

const storage = getStorage(app)

export {app, auth, storage}