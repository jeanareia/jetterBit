const orderRepository = require('../repository/orderRepository');
const itemService = require('./itemService');

class OrderService{

    async createNewOrder(dto) {
        const order = new Order(dto);
        try{
            return await prisma.$transaction(async (tx) => {
                const orderDb = await orderRepository.createNewOrder(order);
                await itemService.createNewItem(order.items, orderDb.id, tx);
                return orderDb;
            });
        }
        catch(error){
            throw new Error(`Something went wrong during creating order. Error: ${error.message}`);
        }
    }

    async getOrderById(orderId){
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