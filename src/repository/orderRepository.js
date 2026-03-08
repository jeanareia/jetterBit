const prisma = require('../database/prismaClient');
const {ObjStatus} = require('../../generated/prisma');
const itemRepository = require("./itemRepository");
const itemService = require('../services/itemService')


class OrderRepository{

    /**
     * Saves the order and its items on DB
     * @param {Object} order - The given order to be saved
     * @param {Object*} items - Its items
     * @returns - Order object already saved
     */
    async createNewOrderWithItems(order, items){
        //1 - Begin the transaction proccess
        //Ensuring that the Order object wont be created unless all its items got created too
        return await prisma.$transaction(async (tx) => {
            //2 - Using this function Order paramether save it on DB
            const orderDb = await this.createNewOrder(order, tx);
            //3 - Does this order have any Item?
            //Yes --> Save them on DB
            //No ---> Just return the STEP 2 order
            if(items && items.length > 0){
                //4 - Using item paramether and STEP 2 Order ID (DB ID) save each item on DB
                //STEP 2 wont return any item. And until this point this Order have no Items
                await itemRepository.createNewItem(items, orderDb.id, tx);
            }
            return orderDb;
        });
    }

    /**
     * Saves a given Order object on DB
     * @param {Object} order - Order object
     * @param {Object} tx - Prisma transaction
     * @returns 
     */
    async createNewOrder(order, tx=prisma){
        return await tx.order.create({
            //1 - Convert the Order object into Prisma structure
            data: orderToPrismaData(order)
        });
    }

    /**
     * Retrieves from DB a active specific Order and its Items based on the Order ID
     * @param {string} orderId - Order Id to search for
     * @returns - Order object
     */
    async getOrderById(orderId){
        return await prisma.order.findUnique({
            //Where OrderId = searching value AND status = ACTIVE
            where: {orderId:orderId, status: ObjStatus.ACTIVE},
            //Load all its items
            include: {items: true}
        });
    }

    /**
     * Retrieves all active orders and its items from DB
     * @param {number} page - Page to look for
     * @param {number} pageSize - How many elements per page
     * @returns - Orders found at the given page
     */
    async getAllOrders(page, pageSize){
        //1 - Defines the index to start looking for
        const skip = (page-1) * pageSize;
        //2 - Retrieves the order list and count how many orders got retrieved
        const [orders, total] = await prisma.$transaction([
            prisma.order.findMany({
                where: {status: ObjStatus.ACTIVE}, //Only ACTIVE Orders
                include: {items: true}, //Includes the Order Items
                skip: skip, //Wich order DB id to start looking for
                take: pageSize, //How many items to be retrieved
                orderBy: {id: 'asc'}
            }),
            prisma.order.count({
                where: {status: ObjStatus.ACTIVE} //counts how many orders got retrieved
            })
        ]);

        return {
            data: orders,
            total: total,
            page: page,
            pageSize: pageSize,
            totalPages: Math.ceil(total/pageSize)
        }
    }

    /**
     * Updates a specific Order on DB based on its ID
     * @param {number} orderId - Order id to be updated
     * @param {Object} order - new property values to be set
     * @param {Object} items - new items to be set
     * @returns - Updated Order object
     */
    async updateOrderWithItemsById(orderId, order, items){
        return await prisma.$transaction(async (tx) => {
            //1 - Update the Order object
            const orderDb = await this.updateOrderById(orderId, order, tx);
            //2 - Is there any Item on this Order?
            //yes ---> update them
            //no ----> Just return STEP 1 Order
            if(items && items.length>0){
                await itemService.updateItemsBatch(orderId, items, tx);
            }
            return orderDb;
        });
    }

    async updateOrderById(orderId, order, tx=prisma){
        return await tx.order.update({
            where: {orderId: orderId},
            data: orderToPrismaData(order)
        })
    }

    async deleteOrderById(orderId, tx=prisma){
        return await tx.order.update({
            where: {orderId: orderId},
            data:{status: ObjStatus.INACTIVE}
        })
    }
}

/**
 * Converts a given Order object into the Prisma structure
 * @param {Object} order - order object
 * @returns - Prisma structure
 */
function orderToPrismaData(order){
    return {
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate
    };
}

module.exports = new OrderRepository();