const readStoreItems = require("../../utils/readStoreItems");

const storeItems = async (req, res) => {
    const storeItems = await readStoreItems();
    res.status(200).json(storeItems);
};

module.exports = { storeItems };
