const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const { loginLimiter, Limiter } = require("../middleware/rateLimiter");


router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({ message: 'Registrovan', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email i lozinka su obavezni.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Ne postoji user' });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Pogrešna lozinka' });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
  
    res.json({
      message: 'Ulogovan',
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
        role: user.role,
      },
    });
    
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})


module.exports = router;