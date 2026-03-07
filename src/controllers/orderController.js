const orderService = require('../services/orderService')

class OrderControlle{
    
    async createNewOrder(req, res) {
        res.send("createNewOrder");
    }
    
    async getOrderById(req, res) {
        res.send("getOrderById");
    }
    
    async getAllOrders(req, res) {
        res.send("getAllOrders");
    }
    
    async updateOrderById(req, res) {
        res.send("UpdateOrderById");
    }
    
    async deleteOrderById(req, res) {
        res.send("deleteOrderById");
    }

}

module.exports = new OrderControlle();