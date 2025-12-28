import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Convert file to Base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Form submit
document.getElementById("driverForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    role: document.getElementById("role").value,
    city: document.getElementById("city").value.trim(),
    Cnic_Number: document.getElementById("Cnic_Number").value.trim(),
    cnic_name: document.getElementById("cnic_name").value.trim(),
    cnic_dob: document.getElementById("cnic_dob").value,
    cnic_issue: document.getElementById("cnic_issue").value,
    cnic_expiry: document.getElementById("cnic_expiry").value,
    License_Number: document.getElementById("License_Number").value.trim(),
    license_expiry: document.getElementById("license_expiry").value,
    emergency_contact: document.getElementById("emergency_contact").value
      .split(",").map(s => s.trim()).filter(s => s),
    emergency_relation: document.getElementById("emergency_relation").value.trim(),
    isVerified: document.getElementById("isVerified").value === "true",
    created_at: new Date().toISOString()
  };

  // Convert images to Base64
  const imageIds = [
    "image_profile",
    "image_cnic_front",
    "image_cnic_back",
    "image_license_front",
    "image_license_back"
  ];

  for (const id of imageIds) {
    const fileInput = document.getElementById(id).files[0];
    data[id] = fileInput ? await toBase64(fileInput) : "";
  }

  try {
    await addDoc(collection(db, "drivers"), data);
    alert("✅ Driver registered successfully!");
    window.location.href = "driver.html";
  } catch (err) {
    console.error(err);
    alert("Error registering driver!");
  }
});
