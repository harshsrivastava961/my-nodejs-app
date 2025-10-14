// // models/User.js

// const mongoose = require('mongoose');

// // A Schema is the blueprint for our data.
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// // A Model is our tool for interacting with a specific collection in the database.
// const User = mongoose.model('User', userSchema);

// module.exports = User; // Export the model directly