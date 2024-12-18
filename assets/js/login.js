document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Ambil nilai input form
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validasi input kosong
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    try {
      // Kirim data ke server menggunakan fetch API
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful!');

        // Simpan token (jika ada) ke localStorage atau sessionStorage
        if (data.token) {
          localStorage.setItem('authToken', data.token); // Simpan token JWT
        }

        alert('Login successful! Redirecting to the main page.');

        // Redirect ke halaman utama
        setTimeout(() => {
          window.location.href = './index.html'; // Halaman utama
        }, 1500); // Waktu tunggu 1.5 detik agar pengguna dapat melihat pesan sukses
      } else {
        // Jika login gagal
        alert(data.message || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server. Please try again later.');
    }
  });

  // Fitur toggle password visibility
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });
});
