const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/userModel");

const authResolver = {
  signup: async (args) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        age,
        gender,
      } = args.userInput;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashPassword,
        firstName,
        lastName,
        age,
        gender,
      });
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return { user, token };
    } catch (err) {
      throw err;
    }
  },
  login: async (args, { req, res }) => {
    try {
      const { email, password } = args;
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("Please try again!");
      }
      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Please try again!");
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("jwt", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        //secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      });
      await user
        .populate({
          path: "matches",
          model: "Match",
          populate: [
            {
              model: "Score",
              path: "result",
              populate: [
                {
                  model: "User",
                  path: "winner",
                  select: "firstName lastName",
                },
                {
                  model: "User",
                  path: "loser",
                  select: "firstName lastName",
                },
              ],
            },
            { model: "User", path: "players", select: "firstName lastName" },
          ],
        })
        .execPopulate();
      return {
        user,
        isLoggedIn: true,
      };
    } catch (err) {
      throw err;
    }
  },
  isLoggedIn: async (args, { req }) => {
    try {
      const token = req.cookies.jwt;

      if (!token) {
        return {
          user: null,
          isLoggedIn: false,
        };
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId).populate({
        path: "matches",
        model: "Match",
        populate: [
          {
            model: "Score",
            path: "result",
            populate: [
              {
                model: "User",
                path: "winner",
                select: "firstName lastName",
              },
              {
                model: "User",
                path: "loser",
                select: "firstName lastName",
              },
            ],
          },
          { model: "User", path: "players", select: "firstName lastName" },
        ],
      });
      if (!user) {
        return {
          user: null,
          isLoggedIn: false,
        };
      }
      return {
        user,
        isLoggedIn: true,
      };
    } catch (err) {
      throw err;
    }
  },
  logout: async (args, { res }) => {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    return {
      user: null,
      isLoggedIn: false,
    };
  },
};

module.exports = authResolver;
