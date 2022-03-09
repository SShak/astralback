const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
//const KEY = process.env.STRIPE_KEY
//const stripe = require("stripe")(KEY);
const stripe = require("stripe")('sk_test_51KVJ0ACzqQ5Y3NqGnSw27A9g6avr1Vlym05tPajxvtBbWTPYqPYqKOqS2leN41I9fB3fTUBdpJ9ks798K3Q7K99d003iIVxyKY');

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;