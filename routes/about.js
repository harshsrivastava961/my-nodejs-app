const express = require("express");
const router = express.Router(); // Create a new router object

// Route for the about page ('/about')
router.get("/", (req, res) => {
  res.send(
    "<h2>This is the About Page with Express</h2><p>Life is much easier now!</p>"
  );
});

// --- Export the Router ---
module.exports = router;
