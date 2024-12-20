document.getElementById("verifyCodeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("code").value.trim(); // Mengambil kode yang dimasukkan
  const feedback = document.getElementById("feedback");

  // Validasi: pastikan kode tidak kosong
  if (!code) {
    feedback.style.display = "block";
    feedback.className = "alert alert-warning";
    feedback.textContent = "Please enter the verification code.";
    return;
  }

  try {
    const response = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const result = await response.json();

    if (response.ok) {
      // Menampilkan feedback jika kode berhasil diverifikasi
      feedback.style.display = "block";
      feedback.className = "alert alert-success";
      feedback.textContent = result.message || "Code verified successfully. Redirecting...";
      
      // Redirect setelah 2 detik
      setTimeout(() => {
        window.location.href = "/set-new-password.html"; // Halaman untuk reset password
      }, 2000);
    } else {
      // Menampilkan feedback jika terjadi kesalahan
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = result.message || "Invalid code. Please try again.";
    }
  } catch (err) {
    // Menangani kesalahan jaringan
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  }
});

// Resend code handler
document.getElementById("resendCode").addEventListener("click", async (e) => {
  e.preventDefault();

  const feedback = document.getElementById("feedback");

  try {
    const response = await fetch("/api/auth/resend-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    // Feedback untuk pengguna setelah mengirim ulang kode
    feedback.style.display = "block";
    feedback.className = response.ok ? "alert alert-success" : "alert alert-danger";
    feedback.textContent = result.message || "Code resent successfully.";
  } catch (err) {
    // Menangani kesalahan jaringan saat mengirim ulang kode
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  }
});

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function (e) {
  const passwordInput = document.getElementById("code");
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});
