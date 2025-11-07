const User = require('../model/user');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email & password required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ email, password });
    const { password: _, ...userWithoutPass } = user.toObject();

    res.status(201).json({ message: 'User created', user: userWithoutPass });
  } catch (err) {
    res.status(500).json({ message: err.message });
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