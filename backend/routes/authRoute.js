const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const passport = require("passport");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie"); // Updated import
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/user-login`,
    session: false,
  }),
  (req, res) => {
    // Use the updated function to generate the token and set the cookie
    generateTokenAndSetCookie(res, req.user);

    // Redirect to the frontend
    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

module.exports = router;
