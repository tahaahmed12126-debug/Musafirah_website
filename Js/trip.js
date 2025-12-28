import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const tripTable = document.getElementById("tripTable");

// Load Trips
async function loadTrips() {
  const tripsCol = collection(db, "trips");
  const tripsSnapshot = await getDocs(tripsCol);
  const tripsList = tripsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  tripTable.innerHTML = "";

  tripsList.forEach(trip => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${trip.driver_name || "-"}</td>
      <td>${trip.passenger_name || "-"}</td>
      <td>${trip.From_Location || "-"}</td>
      <td>${trip.To_Location || "-"}</td>
      <td>${trip.Create_Date_Time || "-"}</td>
      <td>${trip.Complete_Date_Time || "-"}</td>
      <td>${trip.Total_Fare || "-"}</td>
      <td>${trip.Seating_Capacity || "-"}</td>
      <td>${trip.Ratings || "-"}</td>
    `;

    tr.addEventListener("click", () => {
      window.location.href = `TripDetail.html?id=${trip.id}`;
    });

    tripTable.appendChild(tr);
  });
}

// Initial load
loadTrips();
