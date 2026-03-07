const createOrderDto = require('../dto/createOrderDto');
const orderService = require('../services/orderService')

class OrderControlle{
    
    async createNewOrder(req, res) {
        const dto = createOrderDto.parse(req.body);
        try{
            const order = await orderService.createNewOrder(dto);
            return res.status(201).json(order);
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
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