import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase Config
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

// DOM Elements
const driverName = document.getElementById("driverName");
const driverEmail = document.getElementById("driverEmail");
const driverPhone = document.getElementById("driverPhone");
const driverRole = document.getElementById("driverRole");
const driverCity = document.getElementById("driverCity");
const driverCnic = document.getElementById("driverCnic");
const driverCnicName = document.getElementById("driverCnicName");
const driverCnicDob = document.getElementById("driverCnicDob");
const driverCnicIssue = document.getElementById("driverCnicIssue");
const driverCnicExpiry = document.getElementById("driverCnicExpiry");
const driverLicense = document.getElementById("driverLicense");
const driverLicenseExpiry = document.getElementById("driverLicenseExpiry");
const driverEmergency = document.getElementById("driverEmergency");
const driverEmergencyRelation = document.getElementById("driverEmergencyRelation");
const driverStatus = document.getElementById("driverStatus");
const toggleStatusBtn = document.getElementById("toggleStatusBtn");

const imgProfile = document.getElementById("image_profile");
const imgProfileDoc = document.getElementById("image_profile_doc");
const imgCnicFront = document.getElementById("image_cnic_front");
const imgCnicBack = document.getElementById("image_cnic_back");
const imgLicenseFront = document.getElementById("image_license_front");
const imgLicenseBack = document.getElementById("image_license_back");

// Get driver ID from URL
const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("id");

async function loadDriver() {
  if (!driverId) return alert("No driver ID provided!");

  const driverRef = doc(db, "drivers", driverId);
  const driverSnap = await getDoc(driverRef);

  if (!driverSnap.exists()) return alert("Driver not found!");

  const driver = driverSnap.data();

  // Populate Info
  driverName.textContent = driver.name || "-";
  driverEmail.textContent = driver.email || "-";
  driverPhone.textContent = driver.phone || "-";
  driverRole.textContent = driver.role || "-";
  driverCity.textContent = driver.city || "-";
  driverCnic.textContent = driver.Cnic_Number || "-";
  driverCnicName.textContent = driver.cnic_name || "-";
  driverCnicDob.textContent = driver.cnic_dob || "-";
  driverCnicIssue.textContent = driver.cnic_issue || "-";
  driverCnicExpiry.textContent = driver.cnic_expiry || "-";
  driverLicense.textContent = driver.License_Number || "-";
  driverLicenseExpiry.textContent = driver.license_expiry || "-";
  driverEmergency.textContent = Array.isArray(driver.emergency_contact) ? driver.emergency_contact.join(", ") : "-";
  driverEmergencyRelation.textContent = driver.emergency_relation || "-";
  driverStatus.textContent = driver.isVerified ? "Verified" : "Pending";
  driverStatus.className = driver.isVerified ? "status active" : "status pending";

  // Toggle Verification
  toggleStatusBtn.textContent = driver.isVerified ? "Mark Unverified" : "Verify Driver";
  toggleStatusBtn.onclick = async () => {
    await updateDoc(driverRef, { isVerified: !driver.isVerified });
    alert("Driver verification updated!");
    loadDriver();
  };

  // Images
  imgProfile.src = driver.image_profile || "https://via.placeholder.com/150";
  imgProfileDoc.src = driver.image_profile || "https://via.placeholder.com/150";
  imgCnicFront.src = driver.image_cnic_front || "https://via.placeholder.com/150";
  imgCnicBack.src = driver.image_cnic_back || "https://via.placeholder.com/150";
  imgLicenseFront.src = driver.image_license_front || "https://via.placeholder.com/150";
  imgLicenseBack.src = driver.image_license_back || "https://via.placeholder.com/150";
}

loadDriver();
