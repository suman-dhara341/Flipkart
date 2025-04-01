const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  try {
    const { Token } = req.cookies;
    if (!Token) {
      return res
        .status(404)
        .json({ message: "Token not found", success: false });
    }

    const id = await jwt.verify(Token, process.env.JWT_KEY);

    if (!id) {
      return res
        .status(400)
        .json({ message: "Token not valid", success: false });
    }
    req.id = id;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
  }
};

module.exports = tokenVerify;
