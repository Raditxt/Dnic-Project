document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const termsCheckbox = document.getElementById('terms');

  // Toggle visibility for password fields
  const togglePassword = (id) => {
    const input = document.getElementById(id);
    const icon = input.nextElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  };

  // Add click event listener to eye icons
  document.querySelectorAll('.fa-eye').forEach((icon) => {
    icon.addEventListener('click', () => togglePassword(icon.previousElementSibling.id));
  });

  // Phone number input event listener (only allows numbers and checks length)
  document.getElementById('phoneNumber').addEventListener('input', function () {
    // Hanya angka yang boleh dimasukkan
    this.value = this.value.replace(/\D/g, ''); 

    // Membatasi panjang input menjadi 12 digit maksimal
    if (this.value.length > 12) {
      this.value = this.value.slice(0, 12);
    }
  });

  // Form submission handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Grab input values
    const first_name = document.getElementById('firstName').value.trim();
    const last_name = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone_number = document.getElementById('phoneNumber').value.trim();
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirmPassword').value;

    // Basic validation
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !password ||
      !confirm_password
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (!termsCheckbox.checked) {
      alert('You must agree to the Terms and Privacy Policies.');
      return;
    }

    if (password !== confirm_password) {
      alert('Passwords do not match.');
      return;
    }

    // Phone number validation (11 or 12 digits)
    if (phone_number.length < 11 || phone_number.length > 12) {
      alert('Phone number must be between 11 and 12 digits.');
      return;
    }

    try {
      // Send data to server
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          phone_number,
          password,
          confirm_password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully! Redirecting to login page...');
        setTimeout(() => {
          window.location.href = './login.html';
        }, 1500);
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to the server. Please try again later.');
    }
  });
});
