const { z } = require("zod");

const createItemDto = z.object({
    productId: z.number().positive(),
    quantity: z.number().positive(),
    price: z.number().positive()
})

module.exports = createItemDto;