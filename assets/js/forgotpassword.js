document.getElementById('forgotPasswordForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Mencegah reload halaman

  const email = document.getElementById('email').value;
  const feedback = document.getElementById('feedback');

  // Reset feedback area sebelum setiap permintaan
  feedback.style.display = 'none';
  feedback.textContent = '';
  feedback.className = '';

  try {
    const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      // Jika berhasil
      feedback.style.display = 'block';
      feedback.textContent = result.message || 'Email ditemukan. Anda akan diarahkan...';
      feedback.className = 'alert alert-success';

      // Arahkan ke halaman verify-code.html setelah beberapa detik
      setTimeout(() => {
        window.location.href = 'verifycode.html';
      }, 2000);
    } else {
      // Jika gagal (misalnya email tidak ditemukan)
      feedback.style.display = 'block';
      feedback.textContent = result.message || 'Email tidak ditemukan!';
      feedback.className = 'alert alert-danger';
    }
  } catch (error) {
    // Penanganan jika terjadi kesalahan koneksi atau server
    feedback.style.display = 'block';
    feedback.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
    feedback.className = 'alert alert-danger';
    console.error('Error:', error);
  }
});
