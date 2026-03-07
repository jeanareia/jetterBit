const prisma = require('../database/prismaClient');
const {ObjStatus} = require('@prisma/client')

class OrderRepository{

    async createNewOrder(order, tx=prisma){
        return await tx.order.create({
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

function orderToPrismaData(order){
    return {
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate
    };
}