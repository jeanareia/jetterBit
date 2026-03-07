const itemRepository = require('../repository/itemRepository')

class ItemService{

    async createNewItem(items, orderId, tx) {
        try{
            return await itemRepository.createNewItem(items, orderId, tx);
        }
        catch(error){
            throw new Error(`Something went wrong during creating item. Error: ${error.message}`);
        }
    }
}

module.exports = new ItemService();