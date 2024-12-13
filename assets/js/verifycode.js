document
  .getElementById("togglePassword")
  .addEventListener("click", function (e) {
    const passwordInput = document.getElementById("code");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });
