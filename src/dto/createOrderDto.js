const { z } = require("zod");
const createItemDto = require("./createItemDto")

const createOrderDto = z.object({
    orderId: z.string(),
    value: z.number().positive(),
    dataCriacao: z.coerce.date(),
    items: z.array(createItemDto)
})

module.exports = createOrderDto;