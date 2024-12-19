document.querySelector(".btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const feedbackMessage = document.createElement("p");

  // Validasi input email
  if (!email) {
    feedbackMessage.textContent = "Please enter a valid email address.";
    feedbackMessage.style.color = "red";
    document.querySelector(".container").appendChild(feedbackMessage);
    return;
  }

  try {
    const response = await fetch("/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();
    feedbackMessage.textContent = result.message;

    if (response.ok) {
      feedbackMessage.style.color = "green";
    } else {
      feedbackMessage.style.color = "red";
    }

    document.querySelector(".container").appendChild(feedbackMessage);
  } catch (error) {
    feedbackMessage.textContent = "An error occurred. Please try again.";
    feedbackMessage.style.color = "red";
    document.querySelector(".container").appendChild(feedbackMessage);
  }
});
