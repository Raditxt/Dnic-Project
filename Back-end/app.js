const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Untuk meng-handle request body dalam format JSON

// Setup Database (MongoDB)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes (Buat routing API untuk backend di sini)
app.get('/', (req, res) => {
  res.send('Hello World from DNIC Backend!');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import axios from 'axios';

axios.get('http://localhost:5000/api/endpoint')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));

app.use('/api', userRoutes);