const readUsers = require("../../utils/readUsers");
const fs = require("fs").promises;

const getUsers = async (req, res) => {
    const users = await readUsers();
    if (!users || users.length <= 0) {
        return res.status(400).json("No users found");
    }

    res.status(200).json(users);
};

module.exports = { getUsers };
