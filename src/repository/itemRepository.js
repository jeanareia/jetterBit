const prisma = require('../database/prismaClient');
const {ObjStatus} = require('../../generated/prisma')

class ItemRepository{

    /**
     * Saves a Item object on DB
     * @param {Object} items - item to be saved
     * @param {number} orderId - the Order from where this item belongs to
     * @param {Object} tx - Prisma connection
     * @returns - item object
     */
    async createNewItem(items, orderId, tx=prisma){
        return await tx.item.createMany({
            data: itemToPrismaData(items, orderId)
        });
    }

    async getItemsByProductId(productId){
        return await prisma.item.findUnique({
            where: {productId:productId, status: ObjStatus.ACTIVE}
        });
    }

    /**
     * Retrieves all ACTIVE items for a given Order Id
     * @param {number} orderId - Order Id to seearch for
     * @param {Object} tx - Prisma connectrio
     * @returns - Item list
     */
    async getItemsByOrderId(orderId, tx=prisma){
        return await tx.item.findMany({
            where: {orderId:orderId, status: ObjStatus.ACTIVE}
        });
    }

    async getAllItems(){
        return await prisma.item.findMany({
            where: {status: ObjStatus.ACTIVE}
        });
    }

    /**
     * Update an Item object
     * @param {number} itemId - orderId from where this item belongs to
     * @param {Object} item - item new properties
     * @param {Object} tx - Prisma connection
     * @returns - Item object
     */
    async updateItem(itemId, item, tx=prisma){
        return await tx.item.update({
            where: {id: itemId},
            data: {
                quantity: item.quantity,
                price: item.price
            }
        })
    }

    /**
     * Set a given Item status as INACTIVE
     * @param {number} itemId - the item id to be deactivated
     * @param {Object} tx - Prisma connection
     * @returns - deactivated Item
     */
    async deleteItem(itemId, tx=prisma){
        return await tx.item.update({
            where: {id: itemId},
            data:{status: ObjStatus.INACTIVE}
        })
    }
}

/**
 * Converts a Item object into Prisma format
 * @param {Object} items - Item list
 * @param {number} orderId -OrderId from where these items belongs to
 * @returns - Item list
 */
function itemToPrismaData(items, orderId){
    return items.map(item => ({
        orderId: orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
    }))
}

module.exports = new ItemRepository();