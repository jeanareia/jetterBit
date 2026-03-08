const express = require("express");
const orderRoutes = require("./src/routes/orderRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger'); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authMiddleware);
app.use("/order", orderRoutes);

app.listen(PORT, () => {
    console.log(`OrderSystem server running on port: ${PORT}`);
});