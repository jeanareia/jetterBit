const orderRepository = require('../repository/orderRepository');
const itemService = require('./itemService');
const Order = require('../models/Order');
class OrderService{

    /**
     * Creates a new Order object and saves it DB.
     * @param {Object} dto - JSON containing Order information
     * @returns - New Order object created
     */
    async createNewOrder(dto) {
        //1 - Using the JSON, created a new Order object
        const order = new Order(dto);
        try{
            //2 - Saves this Order and its items on DB
            return await orderRepository.createNewOrderWithItems(order, order.items);
        }
        catch(error){
            //3 - In case of any issues during DB transaction
            throw new Error(`Something went wrong during creating order. Error: ${error.message}`);
        }
    }

    /**
     * Retrieves a specific Order and its Items based on the Order Id
     * @param {string} orderId - The order id to search for
     * @returns - JSON format Order object
     */
    async getOrderById(orderId){
        console.log("Retrieving Order for ID: " + orderId);
        return await orderRepository.getOrderById(orderId);
    }

    /**
     * Retrieves all active orders and its items from DB
     * @param {number} page - Page to look for
     * @param {number} pageSize - How many elements per page
     * @returns - Orders found at the given page
     */
    async getAllOrders(page, pageSize){
        return await orderRepository.getAllOrders(page, pageSize);
    }

    async updateOrderById(orderId, order){
        return await orderRepository.updateOrderById(orderId, order);
    }

    async deleteOrderById(orderId){
        return await orderRepository.deleteOrderById(orderId);
    }
}

module.exports = new OrderService();