import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyDcfCygSuHgji-1UAOgqXsOdw4lwb72gsY",
  authDomain: "innoproject-71d64.firebaseapp.com",
  projectId: "innoproject-71d64",
  storageBucket: "innoproject-71d64.firebaseapp.com", // Fixed storage bucket URL
  messagingSenderId: "942124457183",
  appId: "1:942124457183:web:2acfe792f7ad32c7b09d6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Ensure the app instance is passed
export const storageRef = ref(storage);

export const imagesRef = ref(storage, 'prod-images');
export const filesRef = ref(storage, 'prod-images/mountain.jpg');