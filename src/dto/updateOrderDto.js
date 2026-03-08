const { z } = require("zod");
const updateItemDto = require("./updateItemDto")


const updateOrderDto = z.object({
    value: z.number().positive().optional(), //No negative numbers allowed
    creationDate: z.coerce.date().optional(),
    items: z.array(updateItemDto).optional() //Each Order may have Many Items.
})

module.exports = updateOrderDto;