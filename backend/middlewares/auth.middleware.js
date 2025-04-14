const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "my Access Denied. No token provided ,Please login to continue",
    });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userInfo = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Access Denied , No token provided,Please Login to continue",
    });
  }
};

module.exports = authMiddleware;
