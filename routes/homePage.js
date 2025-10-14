const express = require("express");
const router = express.Router(); // Create a new router object

// --- Define Routes on the Router ---

// GET all users
// NOTE: The path is now '/' because the  prefix will be handled in the main file.
// Route for the home page ('/')
router.get("/", (req, res) => {
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-g">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Node.js Home Page</title>
          <!-- The path here is relative to the 'public' folder -->
          <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
          <h1>Welcome to the Home Page with Express!</h1>
      </body>
      </html>
  `);
});

// --- Export the Router ---
module.exports = router; // This is the crucial part
