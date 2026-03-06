const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("First commit");
});

app.listen(PORT, () => {
    console.log(`OrderSystem server running on port: ${PORT}`);
});