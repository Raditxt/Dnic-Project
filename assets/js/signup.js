function showIcons() {
  const icons = document.querySelectorAll('.password-requirements i');
  icons.forEach(icon => icon.classList.remove('hidden'));
}

function validatePassword() {
  const password = document.getElementById('password').value;
  const length = document.getElementById('length');
  const uppercase = document.getElementById('uppercase');
  const number = document.getElementById('number');
  const symbol = document.getElementById('symbol');

  // Validate length
  if (password.length >= 8) {
      length.classList.remove('invalid');
      length.classList.add('valid');
      length.querySelector('i').classList.remove('fa-times');
      length.querySelector('i').classList.add('fa-check');
  } else {
      length.classList.remove('valid');
      length.classList.add('invalid');
      length.querySelector('i').classList.remove('fa-check');
      length.querySelector('i').classList.add('fa-times');
  }

  // Validate uppercase and lowercase
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
      uppercase.classList.remove('invalid');
      uppercase.classList.add('valid');
      uppercase.querySelector('i').classList.remove('fa-times');
      uppercase.querySelector('i').classList.add('fa-check');
  } else {
      uppercase.classList.remove('valid');
      uppercase.classList.add('invalid');
      uppercase.querySelector('i').classList.remove('fa-check');
      uppercase.querySelector('i').classList.add('fa-times');
  }

  // Validate number
  if (/\d/.test(password)) {
      number.classList.remove('invalid');
      number.classList.add('valid');
      number.querySelector('i').classList.remove('fa-times');
      number.querySelector('i').classList.add('fa-check');
  } else {
      number.classList.remove('valid');
      number.classList.add('invalid');
      number.querySelector('i').classList.remove('fa-check');
      number.querySelector('i').classList.add('fa-times');
  }

  // Validate symbol
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      symbol.classList.remove('invalid');
      symbol.classList.add('valid');
      symbol.querySelector('i').classList.remove('fa-times');
      symbol.querySelector('i').classList.add('fa-check');
  } else {
      symbol.classList.remove('valid');
      symbol.classList.add('invalid');
      symbol.querySelector('i').classList.remove('fa-check');
      symbol.querySelector('i').classList.add('fa-times');
  }
}

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const phone_number = document.getElementById("phone_number").value;
  const password = document.getElementById("password").value;

  // Validasi input
  if (!email || !phone_number || !password) {
      alert("All fields are required.");
      return;
  }

  try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, phone_number, password }),
      });

      const data = await response.json();
      if (response.ok) {
          alert("Sign Up successful!");
          console.log(data);
          // Simpan token jika ada
          // localStorage.setItem('token', data.token);
          // Redirect atau lakukan tindakan lain setelah pendaftaran
      } else {
          alert(data.message || "Sign Up failed.");
      }
  } catch (error) {
      console.error("Error during Sign Up:", error);
      alert("An error occurred. Please try again later.");
  }
});

// Mendapatkan elemen togglePassword dan password
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

// Menambahkan event listener pada elemen togglePassword
togglePassword.addEventListener("click", function (e) {
  // Mengubah atribut type
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Mengubah ikon mata
  this.classList.toggle("fa-eye-slash");
});