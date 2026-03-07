const orderRepository = require('../repository/orderRepository')

class OrderService{

    async createNewOrder(order) {
        return await orderRepository.createNewOrder(order);
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