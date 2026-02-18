import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFozkJryRzdjd2boS0UCZSOkIyAd0PCc4",
  authDomain: "ecommerce-6e80b.firebaseapp.com",
  projectId: "ecommerce-6e80b",
  storageBucket: "ecommerce-6e80b.firebasestorage.app",
  messagingSenderId: "676389242146",
  appId: "1:676389242146:web:3b74a9b77408021259517b",
  measurementId: "G-1EHLXT6F76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
