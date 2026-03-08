const { z } = require("zod");

const updateItemDto = z.object({
    productId: z.number().positive(),
    quantity: z.number().positive().optional(),
    price: z.number().positive().optional()
})

module.exports = updateItemDto;