const mongoose = require("mongoose");
const { uuid } = require('uuidv4')

const FundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" || "Users",
  },
  plan: {
    type: String,
    required: true,
    default: "",
  },
  amount: {
    type: Number,
    required: true,
  },
  txref: {
    type: String,
    default: uuid,
  },
  bal: {
    type: Number,
    default: "",
  },
  tinvest: {
    type: Number,
    default: "0",
  },
  twith: {
    type: Number,
    default: "0",
  },
  lwith: {
    type: Number,
    default: "0",
  },
  desc: {
    type: String,
    default: "Funding Initiated",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Fund = mongoose.model("Fund", FundSchema);

module.exports = Fund;
