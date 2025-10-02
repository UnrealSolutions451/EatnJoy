// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJbVdXYkENpBlkxFU-YcqjEtmsMG8AkDs",
  authDomain: "eatnjoy-a27f7.firebaseapp.com",
  projectId: "eatnjoy-a27f7",
  storageBucket: "eatnjoy-a27f7.firebasestorage.app",
  messagingSenderId: "876451158701",
  appId: "1:876451158701:web:cd0f7589187cb9dc94c424",
  measurementId: "G-G4DE1PGJ3N"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth
const auth = getAuth(app);

// Auto sign in anonymously
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Signed in anonymously with UID:", user.uid);
  } else {
    signInAnonymously(auth)
      .then(() => console.log("🔑 Signed in anonymously"))
      .catch(err => console.error("Auth error:", err));
  }
});

export { auth };
