const prisma = require('../database/prismaClient');
const {ObjStatus} = require('../../generated/prisma');
const itemRepository = require("./itemRepository");

class OrderRepository{

    /**
     * Saves the order and its items on DB
     * @param {*} order - The given order to be saved
     * @param {*} items - Its items
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
     * @param {*} order - Order object
     * @param {*} tx - Prisma transaction
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
     * @param {*} orderId - Order Id to search for
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

    async getAllOrders(){
        return await prisma.order.findMany({
            where: {status: ObjStatus.ACTIVE}
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
 * @param {*} order - order object
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