import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

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
const storage = getStorage(app);

// =======================
// DOM Elements
// =======================
const driverTable = document.getElementById("driverTable");
const createDriverBtn = document.getElementById("createDriverBtn");

// Navigate to driver registration
createDriverBtn.addEventListener("click", () => {
  window.location.href = "../Htmldriverregistration.html";
});

// =======================
// Load Drivers
// =======================
async function loadDrivers() {
  const driversCol = collection(db, "drivers");
  const driversSnapshot = await getDocs(driversCol);
  const driversList = driversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  driverTable.innerHTML = ""; // Clear table

  driversList.forEach(driver => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${driver.name}</td>
      <td>${driver.car_model} - ${driver.car_number}</td>
      <td>${driver.trips || 0}</td>
      <td><span class="status ${driver.available ? 'active' : 'pending'}">
          ${driver.available ? 'Active' : 'Pending'}
        </span>
      </td>
      <td>
        ${!driver.available ? `<button class="red-button approve-btn">Approve</button>` : ""}
      </td>
    `;

    // Navigate to driver detail
    tr.addEventListener("click", (e) => {
      if (!e.target.classList.contains("approve-btn")) {
        window.location.href = `DriverDetail.html?id=${driver.id}`;
      }
    });

    // Approve pending driver
    if (!driver.available) {
      tr.querySelector(".approve-btn").addEventListener("click", async (e) => {
        e.stopPropagation();
        await updateDoc(doc(db, "drivers", driver.id), { available: true });
        alert(`${driver.name} approved!`);
        loadDrivers();
      });
    }

    driverTable.appendChild(tr);
  });
}

// Initial load
loadDrivers();
