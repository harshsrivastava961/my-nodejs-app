// Load environment variables from .env (early)
require("dotenv").config();

// 1. Require the express module
const express = require("express");

// 2. Create an express application
const app = express();
// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This is the middleware that serves our static files
app.use(express.static("public"));
// const usersRouter = require("./routes/users");
const homePageRouter = require("./routes/homePage");
const contactFormRouter = require("./routes/contactForm");
const aboutRouter = require("./routes/about");
const contactSubmitRouter = require("./routes/contactForm");
// const usersWithMongodb = require("./routes/usersWithMongodb")
const { userRouter } = require("./routes/usersWithMongodb"); // Use destructuring to get the router
const authRouter = require("./routes/auth");

// 3. Define the hostname and port
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

// 4. Define routes using app.get(), app.post(), etc.
// This is much cleaner than the if/else if structure.

app.use("/", homePageRouter);
app.use("/contact", contactFormRouter);
app.use("/about", aboutRouter);
app.use("/submit-contact-form", contactSubmitRouter);
// app.use("/api/users", usersRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Express handles 404s automatically. If no route matches,
// it will send a default "404 Not Found" response.

// 5. Start the server
app.listen(port, hostname, () => {
  console.log(`Express server running at http://${hostname}:${port}/`);
});
