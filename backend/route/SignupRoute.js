const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router({});
const User = require("../Models/UserModel");


// Register route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Check if user already exists
    const existing = await User.findOne({email});
    if(existing){
        return res.status(400).json({ error: 'Email already in use' });
    }

    // Create new user
    const user = new User({ username, email, password }); // Password will be hashed in the User model pre-save hook
    await user.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(400).json({ error: err.message });
  }
});

// //login
// router.post("/login", async (req, res) => {
//   try {
//     const { username , email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

module.exports = router;