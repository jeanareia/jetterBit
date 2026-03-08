const prisma = require('../database/prismaClient');
const {ObjStatus} = require('../../generated/prisma')

class OrderRepository{

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

    async getOrderById(orderId){
        return await prisma.order.findUnique({
            where: {orderId:orderId, status: ObjStatus.ACTIVE},
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