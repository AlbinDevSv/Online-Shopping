const express = require("express");
const {
    storeItems,
    createCheckoutSession,
} = require("../stripe/stripe.controllers");

const router = express.Router();

router.get("/storeItems", storeItems);
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
