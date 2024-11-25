import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 


const firebaseConfig = {
//
};

console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc };
