// Fitur toggle password
function togglePassword(id) {
  const input = document.getElementById(id);
  const icon = input.nextElementSibling;
  if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
  } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
  }
}

// Ambil elemen-elemen input dan tombol
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneNumberInput = document.getElementById("phoneNumber");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const termsCheckbox = document.getElementById("terms");
const signupButton = document.querySelector("button[type='submit']");

// Fungsi untuk menangani pendaftaran
async function handleSignup(event) {
  event.preventDefault(); // Menghentikan form dari reload otomatis

  // Ambil nilai input
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const phoneNumber = phoneNumberInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validasi password dan konfirmasi password
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Validasi checkbox persetujuan Terms
  if (!termsCheckbox.checked) {
    alert("You must agree to the terms and privacy policies.");
    return;
  }

  // Kirim data pendaftaran ke server menggunakan Fetch API
  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, phoneNumber, password }),
    });

    // Cek jika pendaftaran berhasil
    if (response.ok) {
      const data = await response.json();
      alert("Account created successfully!");
      window.location.href = "/login.html"; // Redirect ke halaman login setelah pendaftaran
    } else {
      // Jika gagal, tampilkan pesan error
      const errorData = await response.json();
      alert(errorData.message || "Sign up failed. Please try again.");
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    alert("An error occurred. Please try again.");
  }
}

// Pasang event listener untuk tombol signup
signupButton.addEventListener("click", handleSignup);
