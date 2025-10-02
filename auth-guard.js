// auth-guard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJbVdXYkENpBlkxFU-YcqjEtmsMG8AkDs",
  authDomain: "eatnjoy-a27f7.firebaseapp.com",
  projectId: "eatnjoy-a27f7",
  storageBucket: "eatnjoy-a27f7.firebasestorage.app",
  messagingSenderId: "876451158701",
  appId: "1:876451158701:web:cd0f7589187cb9dc94c424",
  measurementId: "G-G4DE1PGJ3N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in → redirect to login
    const redirectUrl = encodeURIComponent(window.location.pathname);
    window.location.href = `login.html?redirect=${redirectUrl}`;
    return;
  }

  try {
    // Get role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      console.warn("⚠️ User role not found, logging out.");
      await signOut(auth);
      window.location.href = "login.html";
      return;
    }

    const role = userDoc.data().role;
    const path = window.location.pathname;

    // === Role-based protection ===
    if (role === "staff") {
      // Staff can only access staff pages
      if (path.includes("admin-") || path.includes("analytics") || path.includes("expense") || path.includes("staff-managment")) {
        console.warn("🚫 Staff cannot access admin pages. Redirecting...");
        window.location.href = "index.html";
      }
    }
    // Admin → full access, no restriction

  } catch (err) {
    console.error("Error fetching user role:", err);
    window.location.href = "login.html";
  }
});
