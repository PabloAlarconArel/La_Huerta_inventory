const z = require('zod');

const createProductSchema = z.object({
    barcode:z.string({required_error:'Se requiere el codigo de barras'}),
    productName:z.string({required_error:'Se requiere el nombre del producto'}),
    categories:z.string({required_error:'Se requiere la categoria del producto'}),
    company:z.string({required_error:'Se requiere la empresa del producto'}),
    priceUnity:z.number({required_error:'Se requiere un valor '}),
});

module.exports={createProductSchema}

