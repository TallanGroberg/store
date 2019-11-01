const express = require('express')
const paymentRouter = express.Router()
const Product = require('../models/product.js')
const stripe = require('stripe')(process.env.REACT_APP_PUBLISHABLE_LIVE_APIKEY || process.env.PUBLISHABLE_KEY);



paymentRouter.post("/", async (req, res) => {

  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      description: res.body.description,
      source: req.body.token,
      statement_descriptor: 'Custom descriptor'
    });

    
    return res.json({status});
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
});


module.exports = paymentRouter
