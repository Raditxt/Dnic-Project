// Function to toggle password visibility
function togglePassword(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    icon.classList.toggle("fa-eye-slash");
  }
  
  // Handle the "Set Password" button click
  document.getElementById("setPasswordBtn").addEventListener("click", async () => {
    const feedback = document.getElementById("feedback");
    const createPassword = document.getElementById("create-password").value.trim();
    const reenterPassword = document.getElementById("reenter-password").value.trim();
  
    // Validate passwords
    if (!createPassword || !reenterPassword) {
      feedback.style.display = "block";
      feedback.className = "alert alert-warning";
      feedback.textContent = "Please fill in both password fields.";
      return;
    }
  
    if (createPassword !== reenterPassword) {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = "Passwords do not match. Please try again.";
      return;
    }
  
    try {
      const response = await fetch("/api/auth/set-new-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: createPassword }), // Send the new password
      });
  
      const result = await response.json();
  
      if (response.ok) {
        feedback.style.display = "block";
        feedback.className = "alert alert-success";
        feedback.textContent = result.message || "Password updated successfully. Redirecting...";
        setTimeout(() => {
          window.location.href = "/login.html"; // Redirect ke halaman login setelah sukses
        }, 2000);
      } else {
        feedback.style.display = "block";
        feedback.className = "alert alert-danger";
        feedback.textContent = result.message || "Error setting password. Please try again.";
      }
    } catch (err) {
      feedback.style.display = "block";
      feedback.className = "alert alert-danger";
      feedback.textContent = "Network error. Please try again later.";
    }
  });
  
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
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