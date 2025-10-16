// middleware/auth.js

const jwt = require("jsonwebtoken");

// This is our authentication middleware function
function auth(req, res, next) {
  // 1. Get the token from the request header
  // In a real app, the client will send the token like this: 'Authorization': 'Bearer TOKEN_VALUE'
  // For Postman, we'll use a simpler 'x-auth-token' header.
  const token = req.header("x-auth-token");

  // 2. Check if no token is provided
  if (!token) {
    // 401 Unauthorized is the appropriate status code
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // 3. Verify the token
    // jwt.verify() will decode the token. If the signature is invalid or it's expired, it will throw an error.
    // Use the same secret as in the login route, with a dev fallback
    //const jwtSecret = process.env.JWT_SECRET || 'mySecretKey';
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the user to the request object
    // The payload we created in the login route was { user: { id: user.id } }
    // So, the decoded payload will have that same structure.
    req.user = decodedPayload.user;

    // 5. Pass control to the next function (the actual route handler)
    next();
  } catch (ex) {
    // This block runs if jwt.verify() fails
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = auth;
