const fs = require("fs").promises;

const readUsers = async () => {
    const data = await fs.readFile("./data/users.json");
    const users = JSON.parse(data);

    if (!users || users.length <= 0) {
        return [];
    }

    return users;
};

module.exports = readUsers;
