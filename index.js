const express = require("express");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();
const PORT = 3000;

app.use("/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`OrderSystem server running on port: ${PORT}`);
});