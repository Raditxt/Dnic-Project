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