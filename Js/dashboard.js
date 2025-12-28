// ---------------------
// LEAFLET MAP
// ---------------------
const map = L.map('map').setView([24.8607, 67.0011], 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Karachi predefined areas
const areas = {
  "Clifton": [24.8138, 67.0304],
  "Defence": [24.8121, 67.0676],
  "Saddar": [24.8530, 67.0281],
  "Gulshan-e-Iqbal": [24.9245, 67.0971],
  "Gulistan-e-Johar": [24.9107, 67.1397],
  "Korangi": [24.8209, 67.1228],
  "Malir": [24.8890, 67.1816],
  "Lyari": [24.8670, 66.9994],
  "North Nazimabad": [24.9380, 67.0421],
  "Surjani Town": [25.0023, 67.0643],
  "Baldia Town": [24.9152, 66.9508],
  "Landhi": [24.8503, 67.2008],
  "Shah Faisal Colony": [24.8803, 67.1479],
  "Orangi Town": [24.9505, 66.9776]
};

// Show all area markers on map
Object.entries(areas).forEach(([name, coords]) => {
  L.marker(coords)
    .addTo(map)
    .bindPopup(`<b>${name}</b><br>Lat: ${coords[0]}<br>Lng: ${coords[1]}`);
});

// ---------------------
// CHART JS (Graph)
// ---------------------
const ctx = document.getElementById('driverGraph').getContext('2d');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Clifton', 'Defence', 'Saddar', 'Gulshan', 'Johar'],
    datasets: [{
      label: 'Active Drivers',
      data: [12, 19, 8, 14, 10],
      backgroundColor: 'rgba(179,0,0,0.6)'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
