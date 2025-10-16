// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import the Mongoose User model from the Mongo-backed routes file
// This file also initializes the MongoDB connection on import
const { User } = require('./usersWithMongodb');

// --- User Registration Route ---
// PATH: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        // 1. Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hash the password with the salt

        // 3. Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword // Store the HASHED password
        });

        // 4. Save the user to the database
        const savedUser = await user.save();

        // 5. Respond (do NOT send the password back)
        res.status(201).json({
            message: "User registered successfully!",
            userId: savedUser._id
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// --- User Login Route ---
// PATH: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        // 1. Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // 2. Compare passwords
        // bcrypt.compare() will hash the login password and compare it to the stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." }); // Use a generic message for security
        }

        // 3. If passwords match, create a JWT
        const payload = {
            user: {
                id: user.id // The payload contains claims about the user
            }
        };

        // 4. Sign the token
        jwt.sign(
            payload,
            // 'mySecretKey', // THIS SHOULD BE A SECRET, COMPLEX KEY STORED IN ENVIRONMENT VARIABLES
            process.env.JWT_SECRET, // <-- USE THE ENV VARIABLE
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Send the token back to the client
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;