const createOrderDto = require('../dto/createOrderDto');
const updateOrderDto = require('../dto/updateOrderDto');
const orderService = require('../services/orderService')

class OrderControlle{
    
    /**
     * Creates a new Order and its Items
     * @param {Object} req - HTTP request information (body needed)
     * @param {Object} res - Response
     * @returns - HTTP status code + Order properties in case of success
     */
    async createNewOrder(req, res) {
        try{
            //1 - Transform the given JSON into a DTO
            const dto = createOrderDto.parse(req.body);
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
     * @param {Object} req - HTTP request information (body needed)
     * @param {Object} res - Response
     * @returns - HTTP status code + Order properties in case of success
     */
    async getOrderById(req, res) {
        try{
            //1 - Retrieves the orderId from request paramaethers
            const {orderId} = req.params;
            //2 - Retrieves the order object from DB using STEP 1 orderId
            const order = await orderService.getOrderById(orderId);
            //3 - Is there any matching order?
            //Yes --> Return it
            //No ---> 404 Error
            if(order == null){
                return res.status(404).json({message: "Order not found"});
            }
            return res.status(200).json(order);
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
    
    /**
     * Retrieves all ACTIVE orders from DB
     * @param {Object} req - HTTP request information
     * @param {Object} res - Response
     * @returns - HTTP status code + Order List
     */
    async getAllOrders(req, res) {
        try{
            //1 - Wich page to look for?
            const page = parseInt(req.query.page) || 1;
            //2 - How many items per page?
            const pageSize = parseInt(req.query.pageSize) || 50;
            //3 - Retrieve the orders from DB
            const orderList = await orderService.getAllOrders(page, pageSize);
            //4 - Return the list
            return res.status(200).json(orderList);
        }
        catch(error){
            return res.status(500).json({message: error.message});
        }
    }
    
    /**
     * Updates a specific Order based on its orderId (body needed)
     * @param {Object} req - HTTP request information (body needed)
     * @param {Object} res - Response
     * @returns - HTTP status code + Order properties in case of success
     */
    async updateOrderById(req, res) {
        try{
            const {orderId} = req.params;
            const dto = updateOrderDto.parse(req.body);
            const order = await orderService.updateOrderById(orderId, dto);
            return res.status(200).json(order);
        }
        catch(error){
            //4 - Return 500 for any issue
            return res.status(500).json({message: error.message});
        }
    }
    
    async deleteOrderById(req, res) {
        res.send("deleteOrderById");
    }

}

module.exports = new OrderControlle();