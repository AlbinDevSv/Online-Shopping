const express = require("express");
const cookieSession = require("cookie-session");
require("dotenv").config();
const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");
const stripeRouter = require("./resources/stripe/stripe.router");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: process.env.PUBLIC_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(
    cookieSession({
        secret: "1o2ijhn",
        maxAge: 1000 * 60 * 60, //1 hour
    })
);

//Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/stripe", stripeRouter);

app.listen(3000, () => console.log("Server is up and running...✅"));
