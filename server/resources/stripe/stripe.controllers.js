require("dotenv").config();
const readStoreItems = require("../../utils/readStoreItems");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = async (req, res) => {
    const storeItems = await readStoreItems();
    res.status(200).json(storeItems);
};

// Create session
const createCheckoutSession = async (req, res) => {
    const cartItems = req.body;
    const session = await stripe.checkout.sessions.create({
        line_items: cartItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });
    res.send(JSON.stringify({ url: session.url }));
};

// Returns all products in a list
const listAllProducts = async (req, res) => {
    products = await stripe.products.list({
        limit: 4,
    });

    res.status(200).json(products.data);
};

// Returns a product referred id
const listProduct = async (req, res) => {
    const product = await stripe.products.retrieve(req.body.id);

    res.status(200).json(product);
};

module.exports = {
    storeItems,
    createCheckoutSession,
    listAllProducts,
    listProduct,
};
