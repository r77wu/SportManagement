const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");

const userResolver = {
  users: async () => {
    try {
      const users = await User.find().populate("matches");
      return users;
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args, { req }) => {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        throw new Error("Please try again!");
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByIdAndUpdate(decode.userId, args.userInput, {
        new: true,
      });
      if (!user) {
        throw new Error("Please try again!");
      }
      return user;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = userResolver;
