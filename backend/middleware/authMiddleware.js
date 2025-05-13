// This file should check if tokenData.user.id exists, and if not,
// extract the user ID from the token and add it to the request

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded.user exists (common structure)
    if (decoded.user && decoded.user.id) {
      req.user = decoded.user;
    } else if (decoded.id) {
      // Alternative: token might contain user ID directly
      req.user = { id: decoded.id };
    } else {
      throw new Error("Invalid token structure");
    }

    // For backward compatibility - make userId available too
    req.userId = req.user.id;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
