const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const User = require("../models/User");
const Data = require("../models/Data");
const Fund = require("../models/Fund");
const Cash = require("../models/Cash");
const {
  ensureAuthenticated,
  ensureNotAuthenticated,
} = require("../auth/auth");

// Fund Redirect
router.get("/fund", ensureAuthenticated, async (req, res) => {
  let fund = await Fund.find({ user: req.user.id }).lean();
  let data = await Data.find({ user: req.user.id }).lean();
  let cash = await Cash.find({ user: req.user.id }).lean();
  let user = await User.find({ user: req.user.id }).lean();
  let users = await Users.find({ user: req.user.id }).lean();
  const btc = fund[0].amount * 0.00003;
  res.render("payment/fund", {
    layout: "dash",
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    desc: req.user.desc,
    date: req.user.createdAt,
    fund,
    data,
    cash,
    user,
    users,
    btc,
  });
});

// Fund Redirect
router.get("/fund-online-flutterwave", ensureAuthenticated, async (req, res) => {
  let fund = await Fund.find({ user: req.user.id }).lean();
  let data = await Data.find({ user: req.user.id }).lean();
  let cash = await Cash.find({ user: req.user.id }).lean();
  let user = await User.find({ user: req.user.id }).lean();
  let users = await Users.find({ user: req.user.id }).lean();
  const btc = fund[0].amount * 0.00003;
  res.render("payment/fund_wave", {
    layout: "dash",
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    desc: req.user.desc,
    date: req.user.createdAt,
    fund,
    data,
    cash,
    user,
    users,
    btc,
  });
});

// Withdrawal Redirect
router.get("/withdraw", ensureAuthenticated, async (req, res) => {
  res.render("payment/with", {
    layout: "dash",
  });
});

module.exports = router;
