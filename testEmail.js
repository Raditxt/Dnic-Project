require('dotenv').config(); // Memuat variabel lingkungan dari .env
const sendMail = require('./config/mailConfig'); // Pastikan path ini sesuai dengan lokasi file mailConfig.js

const recipientEmail = 'radityamulyaakbar2@gmail.com'; // Ganti dengan alamat email penerima
const subject = 'Test Email';
const text = 'Hello from OAuth2 nodemailer!';

sendMail(recipientEmail, subject, text)
    .then(result => console.log('Email sent...', result))
    .catch(error => console.error('Error sending email:', error));