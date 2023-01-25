import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHZuLq1jfyYWp1LcIrMfax7C51KZl4Sa8",
  authDomain: "chat-c82d6.firebaseapp.com",
  projectId: "chat-c82d6",
  storageBucket: "chat-c82d6.appspot.com",
  messagingSenderId: "448865106607",
  appId: "1:448865106607:web:f5c5215d812d76f414f25a",
  measurementId: "G-T57QM38FLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
