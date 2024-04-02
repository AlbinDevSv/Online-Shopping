const express = require("express");

const userRouter = require("./resources/users/users.router");
const authRouter = require("./resources/auth/auth.router");

const app = express();

//Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => console.log("Server is up and running...✅"));
