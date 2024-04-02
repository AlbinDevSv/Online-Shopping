const express = require("express");

const app = express;

app.get("/users", (req, res) => {});

app.listen(3000, () => console.log("Server is up and running...✅"));
