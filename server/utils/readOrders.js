const fs = require("fs").promises;

const readOrders = async () => {
    const data = await fs.readFile("./data/orders.json");
    const orders = JSON.parse(data);

    if (!orders || orders.length <= 0) {
        return [];
    }

    return orders;
};

module.exports = readOrders;
