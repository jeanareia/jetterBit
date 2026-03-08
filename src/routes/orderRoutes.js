const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Creates a new Order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "v10089016vdb"
 *               value:
 *                 type: number
 *                 example: 1000
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 500
 *     responses:
 *       201:
 *         description: Order created successfully
 *       409:
 *         description: Order already exists
 *       500:
 *         description: Internal server error
 */
router.post("/", orderController.createNewOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Retrieves all active orders
 *     tags: [Order]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Order list retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get("/list", orderController.getAllOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Retrieves a specific order by orderId
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "v10089016vdb"
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get("/:orderId", orderController.getOrderById);

/**
 * @swagger
 * /order/{orderId}:
 *   patch:
 *     summary: Updates a specific order by orderId
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "v10089016vdb"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 example: 2000
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-07-19T12:24:11.529Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 3
 *                     price:
 *                       type: number
 *                       example: 750
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.patch("/:orderId", orderController.updateOrderById);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deletes a specific order by orderId
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: "v10089016vdb"
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:orderId", orderController.deleteOrderById);

module.exports = router;