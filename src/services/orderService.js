const orderRepository = require('../repository/orderRepository');
const itemService = require('./itemService');
const Order = require('../models/Order');
class OrderService{

    /**
     * Creates a new Order object and saves it DB.
     * @param {*} dto - JSON containing Order information
     * @returns - New Order object created
     */
    async createNewOrder(dto) {
        //1 - Using the JSON, created a new Order object
        console.log("DTO --> " + dto.orderId + " // " + dto.value + " //" + dto.creationDate + " // ");
        if(dto.items.length > 0 ){
            for (let index = 0; index < dto.items.length; index++) {
                const element = dto.items[index];
                console.log(element)
            }
        }
        const order = new Order(dto);
        console.log("ORDER --> " + order);
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
     * @param {*} orderId - The order id to search for
     * @returns - JSON format Order object
     */
    async getOrderById(orderId){
        console.log("Retrieving Order for ID: " + orderId);
        return await orderRepository.getOrderById(orderId);
    }

    async getAllOrders(){
        return await orderRepository.getAllOrders();
    }

    async updateOrderById(orderId, order){
        return await orderRepository.updateOrderById(orderId, order);
    }

    async deleteOrderById(orderId){
        return await orderRepository.deleteOrderById(orderId);
    }
}

module.exports = new OrderService();