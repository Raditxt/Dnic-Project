const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to, subject, text) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
            // Gunakan port 587 untuk TLS
            port: 587,
            secure: false, // Ganti menjadi true jika menggunakan port 465
            debug: true // Aktifkan debug
        });

        const mailOptions = {
            from: `Your App Name <${process.env.EMAIL}>`,
            to,
            subject,
            text,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error in sendMail:', error);
        throw error;
    }
}

module.exports = sendMail;
