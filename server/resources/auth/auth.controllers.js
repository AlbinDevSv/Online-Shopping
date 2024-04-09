const readUsers = require("../../utils/readUsers");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

//Register new user
const register = async (req, res) => {
    const { account_mail, first_name, last_name, password } = req.body;

    //Check if user i not already in database
    const users = await readUsers();
    const userAlreadyExists = users.find(
        (user) => user.account_mail === account_mail
    );

    if (userAlreadyExists) {
        return res.status(400).json("User already exist");
    }

    //Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Save to database
    const newUser = {
        account_mail,
        first_name,
        last_name,
        password: hashedPassword,
    };

    users.push(newUser);
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));

    //Send back the response
    res.status(201).json("http://localhost:5173/register/success");
};

const login = async (req, res) => {
    //Check if user exist
    const { account_mail, password } = req.body;
    const users = await readUsers();
    const userExists = users.find((user) => user.account_mail === account_mail);

    //Check if the password is matching and if user exists
    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
        return res.status(400).json("Wrong user or password");
    }

    //Create a session
    req.session.user = userExists;

    //Send back a response
    res.status(200).json("http://localhost:5173/");
};

const logout = (req, res) => {
    req.session = null;
    res.status(200).json("Successfully logged out");
};

const authorize = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json("You are not logged in");
    }
    res.status(200).json(req.session.user);
};

module.exports = { register, login, logout, authorize };
