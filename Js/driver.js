import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const driverTable = document.getElementById("driverTable");
const createDriverBtn = document.getElementById("createDriverBtn");

// Navigate to driver registration
createDriverBtn.addEventListener("click", () => {
  window.location.href = "../Html/DriverRegistration.html";
});

// Load Drivers
async function loadDrivers() {
  const driversCol = collection(db, "drivers");
  const driversSnapshot = await getDocs(driversCol);
  const driversList = driversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  driverTable.innerHTML = ""; // Clear table

  driversList.forEach(driver => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${driver.name || "-"}</td>
      <td>${driver.car_model || "-"} - ${driver.car_number || "-"}</td>
      <td>${driver.trips || 0}</td>
      <td>${driver.city || "-"}</td>
      <td>${driver.role || "-"}</td>
      <td>
        <span class="status ${driver.isVerified ? 'active' : 'pending'}">
          ${driver.isVerified ? 'Verified' : 'Pending'}
        </span>
      </td>
      <td>
        ${!driver.isVerified ? `<button class="red-button approve-btn">Verify</button>` : ""}
      </td>
    `;

    // Navigate to driver detail
    tr.addEventListener("click", (e) => {
      if (!e.target.classList.contains("approve-btn")) {
        window.location.href = `DriverDetail.html?id=${driver.id}`;
      }
    });

    // Verify driver
    if (!driver.isVerified) {
      tr.querySelector(".approve-btn").addEventListener("click", async (e) => {
        e.stopPropagation();
        await updateDoc(doc(db, "drivers", driver.id), { isVerified: true });
        alert(`${driver.name} verified!`);
        loadDrivers();
      });
    }

    driverTable.appendChild(tr);
  });
}

// Initial load
loadDrivers();
