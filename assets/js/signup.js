document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const phone_number = document.getElementById('phone_number').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone_number, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Sign Up successful!');
        console.log(data);
      } else {
        alert(data.message || 'Sign Up failed.');
      }
    } catch (error) {
      console.error('Error during Sign Up:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  