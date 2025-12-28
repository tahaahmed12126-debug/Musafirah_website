import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// =======================
// Firebase Config
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
const userEmail = document.getElementById("userEmail");
const userCnic = document.getElementById("userCnic");
const userDob = document.getElementById("userDob");
const userContact = document.getElementById("userContact");
const userEmergencyContact = document.getElementById("userEmergencyContact");
const userEmergencyRelation = document.getElementById("userEmergencyRelation");
const userAddress = document.getElementById("userAddress");
const userWallet = document.getElementById("userWallet");

const profileImage = document.getElementById("profileImage");
const cnicFront = document.getElementById("cnicFront");
const cnicBack = document.getElementById("cnicBack");

// =======================
// Get user ID from URL
// =======================
const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

// =======================
// Load User Data
// =======================
async function loadUser() {
  if (!userId) {
    alert("No user ID provided!");
    return;
  }

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("User not found!");
      return;
    }

    const user = userSnap.data();

    // Text Fields
    userName.textContent = user.name || "-";
    userEmail.textContent = user.email || "-";
    userCnic.textContent = user.cnic || "-";
    userDob.textContent = user.DOB || user.dob || "-";
    userContact.textContent = user.contact || "-";
    userAddress.textContent = user.address || "-";
    userWallet.textContent = user.wallet_balance ?? 0;

    // Emergency Contact (Array Safe)
    userEmergencyContact.textContent =
      Array.isArray(user.emergency_contact)
        ? user.emergency_contact.join(", ")
        : "-";

    userEmergencyRelation.textContent =
      user.relation_contact_emergency || "-";

    // Images
    profileImage.src =
      user.profile_image || "https://via.placeholder.com/150";

    cnicFront.src =
      user.image_cnic_front || "https://via.placeholder.com/150";

    cnicBack.src =
      user.image_cnic_back || "https://via.placeholder.com/150";

  } catch (error) {
    console.error("Error loading user:", error);
    alert("Failed to load user data");
  }
}

loadUser();
