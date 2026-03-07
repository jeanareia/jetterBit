const prisma = require('../database/prismaClient');
const {ObjStatus} = require('@prisma/client')

class OrderRepository{

    async createNewOrder(order){
        return await prisma.order.create({
            data: order
        });
    }

    async getOrderById(orderId){
        return await prisma.order.findUnique({
            where: {orderId:orderId, status: ObjStatus.ACTIVE}
        });
    }

    async getAllOrders(){
        return await prisma.order.findMany({
            where: {status: ObjStatus.ACTIVE}
        });
    }

    async updateOrderById(orderId, order){
        return await prisma.order.update({
            where: {orderId: orderId},
            data: order
        })
    }

    async deleteOrderById(orderId){
        return await prisma.order.update({
            where: {orderId: orderId},
            data:{status: ObjStatus.INACTIVE}
        })
    }
}