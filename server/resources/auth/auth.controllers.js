const readUsers = require("../../utils/readUsers");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const register = async (req, res) => {
    const { email, password } = req.body;

    //Kolla så användare inte redan finns
    const users = await readUsers();
    const userAlreadyExists = users.find((user) => user.email === email);

    if (userAlreadyExists) {
        return res.status(400).json("User already exists");
    }

    //Kryptera lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    //Spara till databasen
    const newUser = {
        email,
        password: hashedPassword,
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    //Skicka tillbaka ett svar
    res.status(201).json(newUser);
};

module.exports = register;
