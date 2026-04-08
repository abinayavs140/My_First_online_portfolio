// EMAIL VALIDATION
function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// FORM SUBMIT
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;
  let error = document.getElementById("emailError");

  if (!validateEmail(email)) {
    error.textContent = "Invalid email!";
    return;
  }

  error.textContent = "";

  let data = {
    name,
    email,
    message,
    time: new Date().toLocaleString()
  };

  let responses = JSON.parse(localStorage.getItem("responses")) || [];
  responses.push(data);

  localStorage.setItem("responses", JSON.stringify(responses));

  alert("Message saved!");
  this.reset();
});

// LOGIN
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "xyz" && pass === "1234") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("adminPanel").classList.remove("hidden");

    loadMessages();
  } else {
    alert("Invalid credentials");
  }
  console.log("Login success");
}

// LOAD MESSAGES + DELETE BUTTON
function loadMessages() {
  let container = document.getElementById("user-messages");
  let data = JSON.parse(localStorage.getItem("responses")) || [];

  container.innerHTML = "";

  data.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <p><b>Name:</b> ${item.name}</p>
      <p><b>Email:</b> ${item.email}</p>
      <p><b>Message:</b> ${item.message}</p>
      <p><b>Time:</b> ${item.time}</p>
      <button onclick="deleteMessage(${index})">Delete</button>
    `;

    container.appendChild(div);
    if (data.length === 0) {
    container.innerHTML = "<p>No messages yet</p>";
     return;
    }

    console.log("Loaded messages:", data);
  });
}

// DELETE MESSAGE
function deleteMessage(index) {
  let data = JSON.parse(localStorage.getItem("responses")) || [];

  data.splice(index, 1);
  localStorage.setItem("responses", JSON.stringify(data));

  loadMessages();
}

// DARK MODE TOGGLE
let toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark);
});

// LOAD SAVED THEME
window.onload = () => {
  let saved = localStorage.getItem("theme");

  if (saved === "true") {
    document.body.classList.add("dark");
  }
};