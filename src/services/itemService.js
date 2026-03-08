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

    /**
     * Updates a batch of items. There is 3 different scenarios for this update to behave
     * - 1 - If this item productId is present on both currentItemList and newItemlist. --> At this case, just update the given item properties
     * - 2 - If there is a productId on newItemList missing from currentItemList. --> At this case, set this item status as INACTIVE
     * - 3 - If there is a productId on newItemList there didn't eixst on currentItemList. --> At this case create this Item ans save it locally
     * @param {number} orderId - Order id from where the given item belongs to
     * @param {Object} newItems - New item properties
     * @param {Object} tx - Prisma connection
     */
    async updateItemsBatch(orderId, newItems, tx){
        //1 - Retrieves the current ACTIVE item list for the given order id
        const currentItems = await itemRepository.getItemsByOrderId(orderId, tx);
        //2 - Lookup for uptades on items already saved on DB
        for(const currentItem of currentItems){
            //3 - is this current item on the newItem list?
            const isActive = newItems.find( i => i.productId === currentItem.productId);
            //4 - If its not, set it as INACTIVE
            if(!isActive){
                await itemRepository.deleteItem(currentItem.id, tx);
            }
            //5 - If it is present, update its properties
            else{
                await itemRepository.updateItem(currentItem.id, isActive, tx);
            }
        }
        //6 - Look up for new items to be created
        for(const newItem of newItems){
            //7 - Is this new item already present on STEP 1 current item list?
            const isSaved = currentItems.find(i => i.productId === newItem.productId);
            //8 - If its not, then save it for the firs time
            if(!isSaved){
                await itemRepository.createNewItem([newItem], orderId, tx);
            }
        }
    }

    /**
     * Set a batch of Items status as INACTIVE
     * @param {number} orderId 
     * @param {Object} tx 
     */
    async deleteItemsBatch(orderId, tx){
        await itemRepository.deleteItemsByOrderId(orderId, tx);
    }
}

module.exports = new ItemService();