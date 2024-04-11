const express = require("express");
const {
    retrieveCheckoutSession,
    createCheckoutSession,
    listAllProducts,
    listProduct,
} = require("../stripe/stripe.controllers");

const router = express.Router();

router.get("/list-all-products", listAllProducts);
router.post("/list-product", listProduct);
router.post("/create-checkout-session", createCheckoutSession);
router.post("/retrieve-checkout-session", retrieveCheckoutSession);

module.exports = router;
