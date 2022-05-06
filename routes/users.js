const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Users = require("../models/Users");
const User = require("../models/User");
const Data = require("../models/Data");
const Fund = require("../models/Fund");
const Cash = require("../models/Cash");
const {
  ensureAuthenticated,
  ensureNotAuthenticated,
  ensureAuth,
} = require("../auth/auth");

// Login Page
router.get("/login", ensureNotAuthenticated, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// Register Page
router.get("/register", ensureNotAuthenticated, (req, res) => {
  res.render("register", {
    layout: "login",
  });
});

// Register Handle
router.post(
  "/register",
  check("firstName", "Enter First Name").notEmpty(),
  check("lastName", "Enter Last Name").notEmpty(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Enter Password").notEmpty(),
  check("password", "Password must be up to 6").isLength({ min: 6 }),
  check(
    "password",
    "Password must contain uppercase, lowercase, numbers and symbols"
  ).matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
    "i"
  ),
  check("password2").custom(async (password2, { req }) => {
    const password = req.body.password;
    
    if (password !== password2) {
      throw new Error("Password does not match");
    }
  }),
  async (req, res) => {
    let errors = validationResult(req).array();
    if (errors.length > 0) {
      res.render("register", { layout: "login", errors });
      console.log(errors);
    } else {
      let useremail = await Users.findOne({ email: req.body.email });
      let ers = "";
      if (useremail) {
        ers.push({ msg: "User Exists" });
        res.render("register", ers);
      } else {
        const salt = await bcrypt.genSalt(10);
        const newUser = await Users.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, salt),
        });

        newUser.save();
        res.redirect("/users/login");
      }
    }
  }
);

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Dashboard Page
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  let fund = await Fund.find({ user: req.user.id }).lean();
  let data = await Data.find({ user: req.user.id }).lean();
  let cash = await Cash.find({ user: req.user.id }).lean();
  res.render("dash/dash", {
    layout: "dash.hbs",
    name: req.user.fullName,
    desc: req.user.desc,
    date: req.user.createdAt,
    fund,
    data,
    cash,
  });
});

// Fund Page
router.get("/fund", ensureAuthenticated, (req, res) => {
  res.render("dash/fund", {
    layout: "dash.hbs",
    name: req.user.fullName,
  });
});

// Fund Handle
router.post("/fund", ensureAuthenticated, async (req, res) => {
  let userid = await Fund.findOne({ user: req.user.id });
  if (userid) {
    res.status(400).redirect("/users/fund");
  } else {
    const newFund = await Fund.create({
      plan: req.body.plan,
      amount: req.body.amount,
      user: req.user.id,
      bal: "0.00",
      tinvest: "0.00",
      twith: "0.00",
      lwith: "0.00",
    });
    console.log(newFund);
    newFund.save();
    res.redirect("/payment/fund");
  }
});

// Withdrawal Page
router.get("/withdraw", ensureAuthenticated, async (req, res) => {
  let fund = await Fund.find({ user: req.user.id }).lean();
  let data = await Data.find({ user: req.user.id }).lean();
  res.render("dash/with", {
    layout: "dash.hbs",
    name: req.user.fullName,
    funds: req.user.amount,
    fund,
    data,
  });
});

// Withdrawal handle
router.post("/withdraw", ensureAuthenticated, async (req, res) => {
  let userid = await Cash.findOne({ user: req.user.id });
  if (userid) {
    res.status(400).redirect("/users/withdraw");
  } else {
    const newCash = await Cash.create({
      amount: req.body.amount,
      user: req.user.id,
      address: req.body.address,
    });
    console.log(newCash);
    newCash.save();
    res.redirect("/payment/withdraw");
  }
});

// Profile Page
router.get("/profile", ensureAuthenticated, async (req, res) => {
  const data = await Data.find({ user: req.user.id }).lean();
  const fund = await Fund.find({ user: req.user.id }).lean();
  res.render("dash/profile", {
    layout: "dash.hbs",
    data,
    fund,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    // country: req.user.country,
    // mobile: req.user.mobile
  });
});

// Profile Handle
router.post("/profile", async (req, res) => {
  let userid = await Data.findOne({ user: req.user.id });
  if (userid) {
    res.status(400).redirect("/users/profile");
  } else {
    const newData = await Data.create({
      mobile: req.body.mobile,
      country: req.body.country,
      address: req.body.address,
      gender: req.body.gender,
      user: req.user.id,
    });
    // console.log(newData);
    newData.save();
    res.redirect("/users/profile");
  }
});

// Settings Page
router.get("/settings", ensureAuthenticated, (req, res) => {
  res.render("dash/setting", {
    layout: "dash.hbs",
    name: req.user.fullName,
  });
});

// Setting Handle
router.post("/setting", ensureAuthenticated, async (req, res) => {});

// Logout Handle
router.get("/logout", async (req, res) => {
  req.logout();
  req.flash("success", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
