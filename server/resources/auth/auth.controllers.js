const readUsers = require("../../utils/readUsers");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

//Register new user
const register = async (req, res) => {
    const { email, password } = req.body;

    //Check if user i not already in database
    const users = await readUsers();
    const userAlreadyExists = users.find((user) => user.email === email);

    if (userAlreadyExists) {
        return res.status(400).json("User already exists");
    }

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Save to database
    const newUser = {
        email,
        password: hashedPassword,
    };
    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    //Send back the response
    res.status(201).json(newUser);
};

const login = async (req, res) => {
    //Check if user exist
    const { email, password } = req.body;

    const users = await readUsers();
    const userExists = users.find((user) => user.email === email);

    //Check if the password is matching and if user exists
    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
        return res.status(400).json("Wrong user or password");
    }

    //Create a session

    //Send back a response
};

module.exports = { register, login };
