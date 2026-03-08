const prisma = require('../database/prismaClient');
const {ObjStatus} = require('../../generated/prisma')

class ItemRepository{

    async createNewItem(items, orderId, tx=prisma){
        return await tx.item.createMany({
            data: itemToPrismaData(items, orderId)
        });
    }

    async getItemByProductId(productId){
        return await prisma.item.findUnique({
            where: {productId:productId, status: ObjStatus.ACTIVE}
        });
    }

    async getItemByOrderId(orderId){
        return await prisma.item.findUnique({
            where: {orderId:orderId, status: ObjStatus.ACTIVE}
        });
    }

    async getAllItems(){
        return await prisma.item.findMany({
            where: {status: ObjStatus.ACTIVE}
        });
    }

    async updateItemByProductId(productId, item, tx=prisma){
        return await tx.item.update({
            where: {productId: productId},
            data: itemToPrismaData(item)
        })
    }

    async deleteItemByProductId(productId, tx=prisma){
        return await tx.item.update({
            where: {productId: productId},
            data:{status: ObjStatus.INACTIVE}
        })
    }
}

function itemToPrismaData(items, orderId){
    return items.map(item => ({
        orderId: orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
    }))
}

module.exports = new ItemRepository();