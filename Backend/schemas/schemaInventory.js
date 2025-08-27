const z = require('zod');

const createInventorySchema = z.object({
    quantity: z.number({required_error:'Se requiere un valor '}),
    price:z.number({required_error:'Se requiere un valor '}),
    expDate: z.string().optional(),
});

module.exports={createInventorySchema}