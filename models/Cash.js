const mongoose = require("mongoose");

const CashSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" || "Users",
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "Withdrawal Initiated",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cash = mongoose.model("Cash", CashSchema);

module.exports = Cash;
