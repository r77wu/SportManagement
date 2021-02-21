const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  winningScore: {
    type: Number,
  },
  losingScore: {
    type: Number,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  loser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  belongToMatch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
  },
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
