const readOrders = require("../../utils/readOrders");
const fs = require("fs").promises;
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// Create session
const createCheckoutSession = async (req, res) => {
    const cartItems = req.body;

    let lineItems = [];
    cartItems.map((item) =>
        lineItems.push({ price: item.product.id, quantity: item.quantity })
    );
    console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        customer: req.session.user.customerId,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/",
    });
    res.status(200).json({ url: session.url, checkoutId: session.id });
};

//Retrieve Session
const retrieveCheckoutSession = async (req, res) => {
    const checkoutSessionId = req.body;
    console.log(checkoutSessionId.orderId);
    const session = await stripe.checkout.sessions.retrieve(
        checkoutSessionId.orderId
    );
    const orders = await readOrders();
    if (session.payment_status === "unpaid") {
        res.status(400).json("payment was declined");
    } else {
        const newOrder = { orderId: session.id };

        orders.push(newOrder);

        await fs.writeFile(
            "./data/orders.json",
            JSON.stringify(orders, null, 2)
        );
        res.status(200).json("payment success");
    }
};

// Returns all products in a list
const listAllProducts = async (req, res) => {
    products = await stripe.products.list({ expand: ["data.default_price"] });
    console.log(products.data);
    res.status(200).json(products.data);
};

// Returns a product referred id
const listProduct = async (req, res) => {
    try {
        const product = await stripe.products.retrieve(req.body.id, {
            expand: ["default_price"],
        });
        console.log(product);
        const productData = {
            id: product.default_price.id,
            product_id: product.id,
            price: product.default_price.unit_amount,
            name: product.name,
            image: product.images,
        };

        res.status(200).json(productData);
    } catch {
        res.status(400).json("Product Not Found");
    }
};

module.exports = {
    createCheckoutSession,
    listAllProducts,
    listProduct,
    retrieveCheckoutSession,
};
