const Match = require("../../models/matchModel");
const User = require("../../models/userModel");
const Score = require("../../models/scoreModel");

const matchResolver = {
  matches: async () => {
    try {
      const matches = await Match.find().populate("players");
      return matches;
    } catch (err) {
      throw err;
    }
  },
  createMatch: async (args, req) => {
    if (req.isAuth === false) {
      throw new Error("Please login first");
    }
    try {
      const { title, description, date, players } = args.matchInput;
      const match = await Match.create({
        title,
        description,
        date: new Date(date).toISOString(),
        players,
      });
      for (let playerId of match.players) {
        const user = await User.findById(playerId);
        user.matches.push(match.id);
        await user.save();
      }
      return match;
    } catch (err) {
      throw err;
    }
  },
  updateScore: async (args) => {
    try {
      const {
        match,
        winner,
        loser,
        winningScore,
        losingScore,
      } = args.scoreInput;
      const score = await Score.create({
        winner,
        loser,
        winningScore,
        losingScore,
        belongToMatch: match,
      });
      const belongToMatch = await Match.findByIdAndUpdate(match, {
        result: score.id,
      });
      const updatedWinner = await User.findByIdAndUpdate(winner, {
        $inc: { wins: 1 },
      });
      const updatedLoser = await User.findByIdAndUpdate(loser, {
        $inc: { loses: 1 },
      });
      return score;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = matchResolver;
