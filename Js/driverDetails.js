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
const driverCar = document.getElementById("driverCar");
const driverTrips = document.getElementById("driverTrips");
const driverStatus = document.getElementById("driverStatus");
const toggleStatusBtn = document.getElementById("toggleStatusBtn");

const imgProfile = document.getElementById("image_profile");
const imgFront = document.getElementById("image_car_front");
const imgBack = document.getElementById("image_car_back");
const imgCnic = document.getElementById("image_cnic");

// Get driver ID from URL
const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("id");

async function loadDriver() {
  if (!driverId) return alert("No driver ID provided!");

  const driverRef = doc(db, "drivers", driverId);
  const driverSnap = await getDoc(driverRef);

  if (!driverSnap.exists()) return alert("Driver not found!");

  const driver = driverSnap.data();

  // Basic Info
  driverName.textContent = driver.name;
  driverEmail.textContent = driver.email || "-";
  driverPhone.textContent = driver.phone || "-";
  driverCar.textContent = `${driver.car_model || "-"} - ${driver.car_number || "-"}`;
  driverTrips.textContent = driver.trips || 0;
  driverStatus.textContent = driver.available ? "Active" : "Pending";
  driverStatus.className = driver.available ? "status active" : "status pending";

  // Button
  toggleStatusBtn.textContent = driver.available ? "Mark Unavailable" : "Approve";
  toggleStatusBtn.onclick = async () => {
    await updateDoc(driverRef, { available: !driver.available });
    alert("Driver status updated!");
    loadDriver();
  };

  // Base64 Images
  imgProfile.src = driver.image_profile || "https://via.placeholder.com/150";
  imgFront.src = driver.image_car_front || "https://via.placeholder.com/150";
  imgBack.src = driver.image_car_back || "https://via.placeholder.com/150";
  imgCnic.src = driver.image_cnic || "https://via.placeholder.com/150";
}

loadDriver();
