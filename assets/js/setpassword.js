document.getElementById("setPasswordBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const createPassword = document.getElementById("create-password").value.trim();
  const reenterPassword = document.getElementById("reenter-password").value.trim();
  const feedback = document.getElementById("feedback");

  feedback.style.display = "none"; // Reset feedback visibility

  // Validasi input di sisi front-end
  if (!createPassword || !reenterPassword) {
    feedback.style.display = "block";
    feedback.className = "alert alert-warning";
    feedback.textContent = "Both fields are required.";
    return;
  }

  if (createPassword !== reenterPassword) {
    feedback.style.display = "block";
    feedback.className = "alert alert-warning";
    feedback.textContent = "Passwords do not match.";
    return;
  }

  // Minimum password length validation (optional, bisa disesuaikan)
  if (createPassword.length < 8) {
    feedback.style.display = "block";
    feedback.className = "alert alert-warning";
    feedback.textContent = "Password must be at least 8 characters.";
    return;
  }

  try {
    // Ambil token dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = "Invalid or missing token.";
      return;
    }

    // Kirim request ke backend untuk mengubah password
    const response = await fetch("http://localhost:5000/api/auth/set-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token, // Sertakan token yang diteruskan dari URL
        newPassword: createPassword,
        confirmPassword: reenterPassword,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      feedback.style.display = "block";
      feedback.className = "alert alert-success";
      feedback.textContent =
        result.message || "Password updated successfully. Redirecting...";

      // Redirect ke halaman login setelah 2 detik
      setTimeout(() => {
        window.location.href = "/login.html"; // Redirect ke halaman login
      }, 2000);
    } else {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent =
        result.message || "Failed to update password. Please try again.";
    }
  } catch (error) {
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  }
});

// Fungsi untuk toggle visibilitas password
function togglePassword(id, el) {
  const input = document.getElementById(id);
  if (input.type === "password") {
    input.type = "text";
    el.classList.remove("fa-eye");
    el.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    el.classList.remove("fa-eye-slash");
    el.classList.add("fa-eye");
  }
}
