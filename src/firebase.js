import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcfCygSuHgji-1UAOgqXsOdw4lwb72gsY",
    authDomain: "innoproject-71d64.firebaseapp.com",
    projectId: "innoproject-71d64",
    storageBucket: "innoproject-71d64.firebasestorage.app",
    messagingSenderId: "942124457183",
    appId: "1:942124457183:web:2acfe792f7ad32c7b09d6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);