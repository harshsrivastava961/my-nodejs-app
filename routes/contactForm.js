// routes/users.js

const express = require("express");
const router = express.Router(); // Create a new router object

// --- Define Routes on the Router ---

// GET all users
// NOTE: The path is now '/' because the  prefix will be handled in the main file.
// Route for the contact page ('/')
router.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Us</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Contact Us</h1>
            <form action="/submit-contact-form" method="POST">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="username" required>
                </div>
                <br>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="useremail" required>
                </div>
                <br>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

// Route to handle the form submission
router.post("/", (req, res) => {
  // The express.urlencoded middleware has parsed the form data
  // and put it into the req.body object.
  const submittedName = req.body.username;
  const submittedEmail = req.body.useremail;

  // For now, we'll just log it to the console to see it works.
  console.log("Form submission received:");
  console.log("Name:", submittedName);
  console.log("Email:", submittedEmail);
  console.log("---");

  // Send a response back to the user
  res.send(
    `<h1>Thank you, ${submittedName}!</h1><p>We received your submission.</p>`
  );
});

// --- Export the Router ---
module.exports = router; // This is the crucial part
