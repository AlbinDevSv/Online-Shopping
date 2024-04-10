const express = require("express");
const {
    createCheckoutSession,
    listAllProducts,
    listProduct,
} = require("../stripe/stripe.controllers");

const router = express.Router();

router.get("/list-all-products", listAllProducts);
router.post("/list-product", listProduct);
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
