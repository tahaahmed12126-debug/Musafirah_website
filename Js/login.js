document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const loginContainer = document.querySelector(".login-container");

  setTimeout(() => {
    splash.style.display = "none";
    loginContainer.classList.remove("hidden");
    loginContainer.classList.add("show");
  }, 4000); // Splash visible for 4 seconds
});


// Login form validation
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simple validation example
  if(username === "admin" && password === "admin") {
    window.location.href = "../Html/Dashboard.html"; // redirect to dashboard
  } else {
    document.querySelector(".error-message").textContent = "Invalid username or password!";
  }
});
