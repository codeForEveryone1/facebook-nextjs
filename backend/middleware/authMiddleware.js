const jwt = require("jsonwebtoken");
const response = require("../utils/responceHandler");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return response(
      res,
      401,
      "Authentication required. please provide a token"
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return response(res, 401, "Invalid token or expired. Please try again");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return response(res, 500, "Internal server error. Please try again");
  }
};

module.exports = authMiddleware;
