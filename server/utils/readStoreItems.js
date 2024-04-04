const fs = require("fs").promises;

const readStoreItems = async () => {
    const data = await fs.readFile("./data/storeItems.json");
    const items = JSON.parse(data);

    if (!items || items.length <= 0) {
        return "No items found";
    }

    return items;
};

module.exports = readStoreItems;
