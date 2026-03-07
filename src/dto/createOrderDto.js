const { z } = require("zod");
const createItemDto = require("./createItemDto")

const createOrderDto = z.object({
    orderId: z.string(),
    value: z.number().positive(), //No negative numbers allowed
    dataCriacao: z.coerce.date(),
    items: z.array(createItemDto) //Each Order may have Many Items.
})

module.exports = createOrderDto;