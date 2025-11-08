const User = require('../model/user');
const bcrypt = require('bcryptjs');
const register = async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;

    // 1. Check all required fields
    if (!fullname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Validate password match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // 3. Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // 4. Password strength (example: min 8 chars)
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // 5. Check if user already exists
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // 6. Hash the password (use bcrypt)
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 7. Create user with fullname and hashed password
    const user = await User.create({
      fullname: fullname.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // 8. Remove password from response
    const { password: _, ...userWithoutPass } = user.toObject();

    // 9. Success response
    return res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPass,
    });

  } catch (err) {
    // Handle duplicate email at DB level (if unique index exists)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
  
  


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    const { password: _, ...userWithoutPass } = user.toObject();
    res.json({ message: 'Login success', user: userWithoutPass });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };