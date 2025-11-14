import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// =======================
// Firebase Config & Init
// =======================
const firebaseConfig = {
  apiKey: "AIzaSyDWoif_lwdhAINHWHEhG0l8TjsfzjYeGG8",
  authDomain: "musafirah-app.firebaseapp.com",
  projectId: "musafirah-app",
  storageBucket: "musafirah-app.firebasestorage.app",
  messagingSenderId: "931957871165",
  appId: "1:931957871165:web:6553c97dbc0c5a7e709054",
  measurementId: "G-R4W5JJRH1D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =======================
// DOM Elements
// =======================
const userName = document.getElementById("userName");
const userCnic = document.getElementById("userCnic");
const userContact = document.getElementById("userContact");
const userAddress = document.getElementById("userAddress");

const profileImage = document.getElementById("profileImage");
const cnicFront = document.getElementById("cnicFront");
const cnicBack = document.getElementById("cnicBack");

// Get user ID from URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// =======================
// Load User Data
// =======================
async function loadUser() {
  if (!userId) return alert("No user ID provided!");

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return alert("User not found!");

  const user = userSnap.data();

  // Basic info
  userName.textContent = user.name || "-";
  userCnic.textContent = user.cnic || "-";
  userContact.textContent = user.contact || "-";
  userAddress.textContent = user.address || "-";

  // Images (Base64 stored directly)
  profileImage.src = user.profile_image || "https://via.placeholder.com/150";
  cnicFront.src = user.image_cnic_front || "https://via.placeholder.com/150";
  cnicBack.src = user.image_cnic_back || "https://via.placeholder.com/150";
}

loadUser();
