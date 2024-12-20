document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const feedback = document.getElementById("feedback");

  try {
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      feedback.style.display = "block";
      feedback.className = "alert alert-success";
      feedback.textContent = result.message || "A verification code has been sent to your email.";
      setTimeout(() => {
        window.location.href = "/verify-code.html"; // Redirect ke halaman verifikasi kode
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
  }
});
