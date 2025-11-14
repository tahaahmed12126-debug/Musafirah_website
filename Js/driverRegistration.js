import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
// Helper to convert image to base64
// =======================
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// =======================
// Submit Handler
// =======================
document.getElementById("driverForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const car_model = document.getElementById("car_model").value.trim();
  const car_number = document.getElementById("car_number").value.trim();

  // Convert all images to Base64
  const image_profile = document.getElementById("image_profile").files[0]
    ? await toBase64(document.getElementById("image_profile").files[0])
    : "";
  const image_car_front = document.getElementById("image_car_front").files[0]
    ? await toBase64(document.getElementById("image_car_front").files[0])
    : "";
  const image_car_back = document.getElementById("image_car_back").files[0]
    ? await toBase64(document.getElementById("image_car_back").files[0])
    : "";
  const image_cnic = document.getElementById("image_cnic").files[0]
    ? await toBase64(document.getElementById("image_cnic").files[0])
    : "";

  try {
    await addDoc(collection(db, "drivers"), {
      name,
      email,
      phone,
      car_model,
      car_number,
      trips: 0,
      available: false,
      image_profile,
      image_car_front,
      image_car_back,
      image_cnic,
    });

    alert("✅ Driver registered successfully!");
    window.location.href = "driver.html";
  } catch (error) {
    console.error("Error adding driver:", error);
    alert("Error registering driver!");
  }
});
