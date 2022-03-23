const jwt = require("jsonwebtoken");
const userModel = require("../models/myModel.js");

var auth = async (req, res, next) => {
  const token = await req.cookies.token;
  if (token) {
    try {
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await userModel.findById(userID);
      next();
    } catch (error) {
      res.redirect("/sign-in");
    }
  } else {
    next();
  }
};

module.exports = auth;
