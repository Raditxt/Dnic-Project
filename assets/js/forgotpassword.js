document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const feedback = document.getElementById("feedback");

  // Validasi input email
  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Please enter a valid email address.";
    return;
  }

  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    // Feedback untuk hasil respon
    if (response.ok) {
      feedback.style.display = "block";
      feedback.className = "alert alert-success";
      feedback.textContent = result.message || "A verification code has been sent to your email.";
      
      // Menyimpan token ke localStorage atau sessionStorage
      localStorage.setItem("resetToken", result.token);

      setTimeout(() => {
        window.location.href = "/verify-token.html"; // Redirect ke halaman verifikasi kode
      }, 2000);
    } else {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = result.message || "Error occurred. Please try again.";
    }
  } catch (err) {
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  } finally {
    // Mengosongkan input form setelah pengiriman
    document.getElementById("forgotPasswordForm").reset();
  }
});
