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
    products = await stripe.products.list({ expand: ["data.default_price"] });

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
    storeItems,
    createCheckoutSession,
    listAllProducts,
    listProduct,
};
