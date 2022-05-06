const express = require('express')
const Users = require("../models/Users");
const User = require("../models/User");
const Data = require("../models/Data");
const Fund = require("../models/Fund");
const Cash = require("../models/Cash");

let fund = Fund.find({ user: req.user.id }).lean();
let data = Data.find({ user: req.user.id }).lean();
let cash = Cash.find({ user: req.user.id }).lean();
let user = User.find({ user: req.user.id }).lean();
let users = Users.find({ user: req.user.id }).lean();

const userAmount = fund.amount;
const tx = fund.txref
const UserId = fund.user
const makePayment = document.getElementById("makePayment");

makePayment.addEventListener("click", () => {
  console.log(fund);
  FlutterwaveCheckout({
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: tx,
    amount: userAmount,
    currency: "NGN",
    country: "NG",
    payment_options: " ",
    // specified redirect URL
    redirect_url: "localhost:4000/users/dashboard",
    meta: {
      consumer_id: UserId,
      consumer_mac: UserId,
    },
    customer: {
      email: "lexizuchenna@gmail.com",
      phone_number: "08102909304",
      name: "Flutterwave Developers",
    },
    callback: function (data) {
      console.log(data);
    },
    onclose: function () {
      // close modal
    },
    customizations: {
      title: "Bitly Investment",
      description: "Payment for Investment",
      logo: "",
    },
  });
});
