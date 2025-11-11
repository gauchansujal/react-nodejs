// controllers/UserController.js
const User = require('../model/user');

const register = async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;

    if (!fullname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be 8+ chars' });
    }

    // LET pre('save') HASH IT — NO MANUAL HASH!
    const user = await User.create({
      fullname: fullname.trim(),
      email: email.toLowerCase(),
      password // ← plain text
    });

    const { password: _, ...userWithoutPass } = user.toObject();
    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPass
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // THIS LINE FIXES 401
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { password: _, ...userWithoutPass } = user.toObject();
    res.json({
      message: 'Login successful',
      user: userWithoutPass
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };