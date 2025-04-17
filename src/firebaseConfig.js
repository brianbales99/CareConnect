import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm6FmAIgcfjohpXxB75tZC4BNXB3w1n28",
  authDomain: "care-connect-2c45e.firebaseapp.com",
  projectId: "care-connect-2c45e",
  storageBucket: "care-connect-2c45e.appspot.com",
  messagingSenderId: "90291633944",
  appId: "1:90291633944:web:21d3bd4cd5fc3218cae86d",
  measurementId: "G-LHS75ZSB36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
