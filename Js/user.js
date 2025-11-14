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

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elements
const userTable = document.getElementById("userTable");
const createUserBtn = document.getElementById("createUserBtn");

// Navigate to registration page
createUserBtn.addEventListener("click", () => {
  window.location.href = "userregistration.html";
});

// Load Users
async function loadUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  userTable.innerHTML = "";

  userList.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name || ""}</td>
      <td>${user.cnic || ""}</td>
      <td>${user.contact || ""}</td>
      <td>${user.address || ""}</td>
    `;
    tr.addEventListener("click", () => {
      window.location.href = `userdetail.html?id=${user.id}`;
    });
    userTable.appendChild(tr);
  });

  if (userList.length === 0) {
    userTable.innerHTML = `<tr><td colspan="4" style="text-align:center;">No users found</td></tr>`;
  }
}

loadUsers();
