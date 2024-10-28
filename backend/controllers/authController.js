const User = require("../model/User");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie"); // Updated import
const response = require("../utils/responceHandler");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, dateOfBirth } = req.body;

    // Check for existing user with email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response(res, 400, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      dateOfBirth,
    });

    await newUser.save();

    // Use the updated function to generate the token and set the cookie
    generateTokenAndSetCookie(res, newUser);

    return response(res, 201, "User created successfully", {
      username: newUser.username,
      email: newUser.email,
      user: {
        ...newUser._doc,
        password: null,
      },
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error", error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for existing user with email
    const user = await User.findOne({ email });
    if (!user) {
      return response(res, 404, "User not found with this email");
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return response(res, 404, "Invalid Password");
    }

    // Use the updated function to generate the token and set the cookie
    generateTokenAndSetCookie(res, user);

    return response(res, 201, "User logged in successfully", {
      username: user.username,
      email: user.email,
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error", error.message);
  }
};

const logout = (req, res) => {
  try {
    res.cookie("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });
    return response(res, 200, "User logged out successfully");
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal Server Error", error.message);
  }
};

module.exports = { registerUser, loginUser, logout };
