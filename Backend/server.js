const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// ROUTES
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
app.use(express.urlencoded({ extended: true }));

// TEST
app.get('/test', (req, res) => {
  res.json({ message: 'Server is alive!' });
});

// DB
mongoose.connect('mongodb://127.0.0.1:27017/authdb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB Error:', err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});