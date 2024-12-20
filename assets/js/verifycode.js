document.getElementById("verifyCodeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("code").value.trim();
  const feedback = document.getElementById("feedback");

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
      feedback.style.display = "block";
      feedback.className = "alert alert-success";
      feedback.textContent = result.message || "Code verified successfully. Redirecting...";
      setTimeout(() => {
        window.location.href = "/set-new-password.html"; // Redirect ke halaman reset password
      }, 2000);
    } else {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = result.message || "Invalid code. Please try again.";
    }
  } catch (err) {
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

    feedback.style.display = "block";
    feedback.className = response.ok ? "alert alert-success" : "alert alert-danger";
    feedback.textContent = result.message || "Code resent successfully.";
  } catch (err) {
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  }
});
document
  .getElementById("togglePassword")
  .addEventListener("click", function (e) {
    const passwordInput = document.getElementById("code");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });
