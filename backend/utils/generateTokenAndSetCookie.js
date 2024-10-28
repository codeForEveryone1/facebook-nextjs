const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign(
    { userId: user?._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // You can change this to whatever expiry you want
  );

  // Set the cookie with the generated token
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 1 * 24 * 60 * 60 * 1000, // Set cookie max age (90 days)
  });

  return token; // Return the token if needed
};

module.exports = { generateTokenAndSetCookie };
