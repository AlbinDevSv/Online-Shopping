const express = require("express");
const cookieSession = require("cookie-session");

const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");

const app = express();

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

app.listen(3000, () => console.log("Server is up and running...✅"));
