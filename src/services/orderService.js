const orderRepository = require('../repository/orderRepository');
const itemService = require('./itemService');

class OrderService{

    /**
     * Creates a new Order object and saves it DB.
     * @param {*} dto - JSON containing Order information
     * @returns - New Order object created
     */
    async createNewOrder(dto) {
        //1 - Using the JSON, created a new Order object
        const order = new Order(dto);
        try{
            //2 - Begin the transaction proccess
            //Ensuring that the Order object wont be created unless all its items got created too
            return await prisma.$transaction(async (tx) => {
                //3 - Using STEP 1 object, save it on DB
                const orderDb = await orderRepository.createNewOrder(order);
                //4 - Does this order have any Item?
                //Yes --> Save them on DB
                //No ---> Just return the STEP 3 order
                if(order.items || order.items.length > 0){
                    //5 - Using STEP 1 item list and STEP 3 Order ID (DB ID) save each item on DB
                    //STEP 3 wont return any item. And until this point this Order have no Items
                    await itemService.createNewItem(order.items, orderDb.id, tx);
                }
                //6 - Success
                return orderDb;
            });
        }
        catch(error){
            //7 - In case of any issues during DB transaction
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