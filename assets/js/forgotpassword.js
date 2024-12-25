document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Mencegah reload halaman
  
  const email = document.getElementById('email').value;
  const feedback = document.getElementById('feedback');
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    

    if (response.ok) {
      // Jika berhasil
      feedback.style.display = 'block';
      feedback.textContent = result.message;
      feedback.className = 'alert alert-success';
    } else {
      // Jika gagal
      feedback.style.display = 'block';
      feedback.textContent = result.message;
      feedback.className = 'alert alert-danger';
    }
  } catch (error) {
    feedback.style.display = 'block';
    feedback.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
    feedback.className = 'alert alert-danger';
  }
});
