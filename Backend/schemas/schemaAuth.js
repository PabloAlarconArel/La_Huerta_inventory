const z = require('zod');

const registerSchema = z.object({
    email: z.string().email({message:'email invalido'}),
    password:z.string({required_error:'Contraseña requerida'}).min(6,{message:'La contraseña debe ser de al menos 6 caracteres' }),
    type:z.string()
});

const loginSchema = z.object({
    email: z.email({message:'email invalido'}),
    password:z.string({required_error:'Contraseña requerida'}).min(6,{message:'La contraseña debe ser de al menos 6 caracteres' })

}) ;

module.exports = {loginSchema,registerSchema}

