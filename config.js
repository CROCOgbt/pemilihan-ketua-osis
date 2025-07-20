// --- Firebase Setup ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  runTransaction,
  onValue,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnF6XUxtMrO6L82wGzxF87P0bMLFDTPS4",
  authDomain: "voting-44c9b.firebaseapp.com",
  databaseURL:
    "https://voting-44c9b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "voting-44c9b",
  storageBucket: "voting-44c9b.appspot.com",
  messagingSenderId: "76326889613",
  appId: "1:76326889613:web:b08f2059c01a87bdd0dac4",
  measurementId: "G-H0PKVZCN11",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
export { db, app, analytics, ref, onValue, runTransaction};