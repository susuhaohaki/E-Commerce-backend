const jwt = require("jsonwebtoken");
const authToken = async (req, res, next) => {
  try {
    // Lấy token từ cookies hoặc header của request
    const token = req.cookies?.token;
    if (!token) {
      return res.status(200).json({
        message: "User not Login",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("error auth", err);
        return res.status(401).json({
          message: "Token is not valid",
          error: true,
          success: false,
        });
      }
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = authToken;
