import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

    const firebaseConfig = {
      apiKey: "AIzaSyDWoif_lwdhAINHWHEhG0l8TjsfzjYeGG8",
      authDomain: "musafirah-app.firebaseapp.com",
      projectId: "musafirah-app",
      storageBucket: "musafirah-app.firebasestorage.app",
      messagingSenderId: "931957871165",
      appId: "1:931957871165:web:6553c97dbc0c5a7e709054",
      measurementId: "G-R4W5JJRH1D",
    };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
