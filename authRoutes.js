const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../user");

const router = express.Router();

// POST route to register a new user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if fields are empty
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user and save it to the database
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
