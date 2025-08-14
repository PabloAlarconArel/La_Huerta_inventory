const z = require('zod');

const createInventorySchema = z.object({
    quantity: z.number({required_error:'Se requiere un valor '}),
    pricePack:z.number({required_error:'Se requiere un valor '}),
    expDate: z.string().optional(),
    lote: z.number({required_error:'Se requiere un valor '}),
});

module.exports={createInventorySchema}