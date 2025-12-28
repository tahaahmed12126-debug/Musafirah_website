import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
// Convert File to Base64
// =======================
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// =======================
// Form Submission
// =======================
document.getElementById("userForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const cnic = document.getElementById("cnic").value;
  const dob = document.getElementById("dob").value;
  const contact = document.getElementById("contact").value;
  const address = document.getElementById("address").value;
  const wallet_balance = parseFloat(document.getElementById("walletBalance").value) || 0;

  const emergencyContact = document.getElementById("emergencyContact").value
    .split(",")
    .map(s => s.trim())
    .filter(s => s);

  const relationEmergency = document.getElementById("relationEmergency").value;

  const profileFile = document.getElementById("profileImage").files[0];
  const cnicFrontFile = document.getElementById("cnicFront").files[0];
  const cnicBackFile = document.getElementById("cnicBack").files[0];

  let profile_image = "";
  let image_cnic_front = "";
  let image_cnic_back = "";

  if (profileFile) profile_image = await toBase64(profileFile);
  if (cnicFrontFile) image_cnic_front = await toBase64(cnicFrontFile);
  if (cnicBackFile) image_cnic_back = await toBase64(cnicBackFile);

  try {
    await addDoc(collection(db, "users"), {
      name,
      email,
      cnic,
      DOB: dob,
      contact,
      address,
      wallet_balance,
      emergency_contact: emergencyContact,
      relation_contact_emergency: relationEmergency,
      profile_image,
      image_cnic_front,
      image_cnic_back,
      created_at: new Date().toISOString(),
    });

    alert("User created successfully!");
    document.getElementById("userForm").reset();
    window.location.href = "user.html";

  } catch (err) {
    console.error("Error adding user:", err);
    alert("Error creating user!");
  }
});
