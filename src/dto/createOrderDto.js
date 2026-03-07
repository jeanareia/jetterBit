const { z } = require("zod");

const createOrderDto = z.object({
    orderId: z.string(),
    value: z.number().positive(),
    dataCriacao: z.coerce.date()
})

module.exports = createOrderDto;