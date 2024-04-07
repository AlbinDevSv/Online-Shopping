require("dotenv").config();
const readStoreItems = require("../../utils/readStoreItems");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = async (req, res) => {
    const storeItems = await readStoreItems();
    res.status(200).json(storeItems);
};

const createCheckoutSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Skicka med en lista med produkter som ska köpas
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "T-shirt",
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
    });
    res.send(JSON.stringify({ url: session.url }));
};

module.exports = { storeItems, createCheckoutSession };
