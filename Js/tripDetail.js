import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const driverName = document.getElementById("driver_name");
const passengerName = document.getElementById("passenger_name");
const fromLocation = document.getElementById("from_location");
const toLocation = document.getElementById("to_location");
const createDateTime = document.getElementById("create_date_time");
const completeDateTime = document.getElementById("complete_date_time");
const totalFare = document.getElementById("total_fare");
const seatingCapacity = document.getElementById("seating_capacity");
const ratings = document.getElementById("ratings");

// Get trip ID from URL
const urlParams = new URLSearchParams(window.location.search);
const tripId = urlParams.get("id");
function formatTimestamp(ts) {
  if (!ts) return "-";

  // Firestore Timestamp → JS Date
  const date = ts.toDate();

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

async function loadTrip() {
  if (!tripId) return alert("No trip ID provided!");

  const tripRef = doc(db, "trips", tripId);
  const tripSnap = await getDoc(tripRef);

  if (!tripSnap.exists()) return alert("Trip not found!");

  const trip = tripSnap.data();

  driverName.textContent = trip.driver_name || "-";
  passengerName.textContent = trip.passenger_name || "-";
  fromLocation.textContent = trip.From_Location || "-";
  toLocation.textContent = trip.To_Location || "-";
createDateTime.textContent = formatTimestamp(trip.Create_Date_Time);
completeDateTime.textContent = formatTimestamp(trip.Complete_Date_Time);

  totalFare.textContent = trip.Total_Fare || "-";
  seatingCapacity.textContent = trip.Seating_Capacity || "-";
  ratings.textContent = trip.Ratings || "-";
}

loadTrip();
