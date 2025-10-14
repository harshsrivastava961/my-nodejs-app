// routes/users.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// --- 1. CONNECT TO MONGODB ---
// We define the connection string. 'mydatabase' is the name of the database.
// MongoDB will create it for us if it doesn't exist.
const mongoURI = "mongodb://127.0.0.1:27017/mydatabase";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((err) => console.error("Failed to connect to MongoDB...", err));

// --- 2. DEFINE A SCHEMA AND MODEL ---
// A Schema is the blueprint for our data. It defines the fields and their types.
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, // Automatically set the creation date
});

// A Model is our tool for interacting with a specific collection in the database.
// Mongoose will create a collection named 'users' (plural and lowercase) from the 'User' model.
const User = mongoose.model("User", userSchema);

// --- 3. CREATE THE API ROUTES ---

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // .find() gets all documents
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // .findById() is a convenient helper
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new user (POST)
router.post("/", async (req, res) => {
  // Create a new user object based on our Model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newUser = await user.save(); // .save() persists this object to the database
    res.status(201).json(newUser);
  } catch (err) {
    // Handle potential errors, like a duplicate email
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a user by ID (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, // The ID of the user to find
      {
        name: req.body.name, // The new data to update with
        email: req.body.email,
      },
      { new: true, runValidators: true } // Options for the update
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // Send back the updated user object
  } catch (err) {
    // Handle errors, like a validation error on the email
    res.status(400).json({ message: err.message });
  }
});

// --- 4. EXPORT THE ROUTER ---
// module.exports = router;
module.exports = {
    userRouter: router,
    User: User
};

// Key Changes and Explanations:
// require('mongoose'): Imports the Mongoose library.
// mongoose.connect(mongoURI, ...): This is the core of the database connection.
// mongoURI: Replace 'mongodb://localhost:27017/mydatabase' with the connection string for your MongoDB instance.
// mongodb:// is the protocol.
// localhost is the server (your local machine).
// 27017 is the default port.
// /mydatabase is the name of the database you want to use. MongoDB will automatically create this database if it doesn't exist.
// useNewUrlParser: true, useUnifiedTopology: true: These are options required by Mongoose to handle the connection correctly.
// .then() and .catch(): We use these to handle successful and unsuccessful database connections. You should see Connected to MongoDB... in your terminal when the server starts.
// userSchema: Defines the structure of our user data.
// name: { type: String, required: true }: This means the name field will store a string and is required.
// email: { type: String, required: true, unique: true }: We've made the email unique to prevent duplicate email addresses.
// User = mongoose.model('User', userSchema): This creates a model. A model is a Mongoose object that represents a collection (like a table) in your MongoDB database. We will use this User model to interact with the database. Mongoose will automatically create a collection called users (plural) to store the users.
// Database operations (User.find(), User.findById(), user.save(), User.findByIdAndDelete()): These are the Mongoose methods used to interact with your database. They replace our old in-memory array. These are asynchronous operations (they take some time to complete), so we use async/await to handle the responses.
// Error Handling: We've added basic error handling to catch database connection errors and validation errors (like duplicate emails). In a real application, you would add more robust error handling.
