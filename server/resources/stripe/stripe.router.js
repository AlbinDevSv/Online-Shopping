const express = require("express");
const { storeItems } = require("../stripe/stripe.controllers");

const router = express.Router();

router.get("/storeItems", storeItems);

module.exports = router;
