document.getElementById("verifyCodeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = document.getElementById("token").value.trim();  // Mengambil token dari input field
  const feedback = document.getElementById("feedback");

  feedback.style.display = "none"; // Reset feedback visibility

  if (!token) {
    feedback.style.display = "block";
    feedback.className = "alert alert-warning";
    feedback.textContent = "Please enter the verification token.";
    return;
  }

  try {
    // Mengirimkan token ke backend
    const response = await fetch("http://localhost:5000/api/auth/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),  // Mengirimkan token ke server
    });

    const result = await response.json();

    if (response.ok) {
      feedback.style.display = "block";
      feedback.className = "alert alert-success";
      feedback.textContent = result.message || "Token verified successfully. Redirecting...";

      // Mengarahkan ke halaman setpassword.html dengan membawa token
      setTimeout(() => {
        window.location.href = `/setpassword.html?token=${token}`; // Token dibawa ke setpassword.html
      }, 2000);
    } else {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = result.message || "Invalid token. Please try again.";
    }
  } catch (error) {
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  }
});

document.getElementById("resendCode").addEventListener("click", async (e) => {
  e.preventDefault();

  const feedback = document.getElementById("feedback");
  feedback.style.display = "none"; // Reset feedback visibility

  try {
    const response = await fetch("/api/auth/resendcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    feedback.style.display = "block";
    feedback.className = response.ok ? "alert alert-success" : "alert alert-danger";
    feedback.textContent = result.message || "Code resent successfully.";
  } catch (error) {
    feedback.style.display = "block";
    feedback.className = "alert alert-danger";
    feedback.textContent = "Network error. Please try again later.";
  }
});
