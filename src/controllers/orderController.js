const createOrderDto = require('../dto/createOrderDto');
const orderService = require('../services/orderService')

class OrderControlle{
    
    /**
     * Creates a new Order and its Items
     * @param {*} req - HTTP request information (body needed)
     * @param {*} res - Response
     * @returns - HTTP status code + Order properties in case of success
     */
    async createNewOrder(req, res) {
        //1 - Transform the given JSON into a DTO
        const dto = createOrderDto.parse(req.body);
        try{
            //2 - Using STEP 1 DTO instatiate the Order+Item objects and save them all on DB
            const order = await orderService.createNewOrder(dto);
            //3 - Return OK + Order+Item properties
            return res.status(201).json(order);
        }
        catch(error){
            //4 - Return 500 for any issue
            return res.status(500).json({message: error.message});
        }
    }
    
    /**
     * Retrieves a specific ACTIVE Order and its Items based on the order id
     * @param {*} req - HTTP requestio information (body needed)
     * @param {*} res - Response
     * @returns - HTTP status code + Order properties in case of success
     */
    async getOrderById(req, res) {
        try{
            const {orderId} = req.params;
            const order = await orderService.getOrderById(orderId);
            if(order == null){
                return res.status(404).json({message: "Order not found"});
            }
            return res.status(200).json(order);
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
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