document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
      console.log(data.token);
      localStorage.setItem('authToken', data.token);
    } else {
      alert(data.message || 'Login failed.');
    }
  } catch (error) {
    console.error('Error during Login:', error);
    alert('An error occurred. Please try again later.');
  }
});
