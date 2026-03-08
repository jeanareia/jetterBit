const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createNewOrder);
router.get("/list", orderController.getAllOrders);
router.get("/:orderId", orderController.getOrderById);
router.patch("/:orderId", orderController.updateOrderById);
router.delete("/:orderId", orderController.deleteOrderById);

module.exports = router;