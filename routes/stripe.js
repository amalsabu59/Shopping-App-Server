const router = require("express").Router();
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")("sk_test_51KjLxVIzMTFQLI8gjbnewChvVUF0wyC06lDF3BdK4wkFoZeh0Yrs4H5jCUPc9mOghWn6QGSfbYIyNxp8tjnA8gDb00UksnktIL")


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
