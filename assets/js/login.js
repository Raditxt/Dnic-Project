// Fitur toggle password
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
  // Toggle the type attribute of password input
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  // Toggle the eye slash icon
  this.classList.toggle('fa-eye');
  this.classList.toggle('fa-eye-slash');
});

// Ambil elemen-elemen input dan tombol
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.querySelector("button[type='submit']");

// Fungsi untuk menangani login
async function handleLogin(event) {
  event.preventDefault(); // Menghentikan form dari reload otomatis

  // Ambil nilai input
  const email = emailInput.value;
  const password = passwordInput.value;

  // Kirim data login ke server menggunakan Fetch API
  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Cek jika login berhasil
    if (response.ok) {
      const data = await response.json();

      // Simpan token JWT ke localStorage
      localStorage.setItem("authToken", data.token);

      // Redirect ke halaman dashboard atau halaman utama setelah login
      window.location.href = "/dashboard.html";
    } else {
      // Jika login gagal, tampilkan pesan error
      const errorData = await response.json();
      alert(errorData.message || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
}

// Pasang event listener untuk tombol login
loginButton.addEventListener("click", handleLogin);
