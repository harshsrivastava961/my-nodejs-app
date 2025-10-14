// routes/users.js

const express = require("express");
const router = express.Router(); // Create a new router object

// --- Mock Database (for this file only) ---
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

// --- Define Routes on the Router ---

// GET all users
// NOTE: The path is now '/' because the '/api/users' prefix will be handled in the main file.
router.get("/", (req, res) => {
  // Instead of res.send() with HTML, we use res.json()
  // 1. It automatically converts the JavaScript array/object to a JSON string.
  // 2. It sets the 'Content-Type' header to 'application/json'.
  res.json(users);
});

// CREATE a new user (POST)
router.post("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  // Generate a simple ID (in a real app, the database does this)
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// GET a single user by ID
// The ':id' is the route parameter. Express will capture the value
// from the URL and put it in req.params.id
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id); // URL params are always strings, so convert to number
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        // If no user is found, send a 404 Not Found status
        res.status(404).json({ error: 'User not found' });
    }
});

// DELETE a user by ID
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        // Remove the user from the array
        const deletedUser = users.splice(userIndex, 1);
        // Send back a success message or the deleted user
        res.json({ message: 'User deleted successfully', user: deletedUser[0] });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// --- Export the Router ---
module.exports = router; // This is the crucial part
