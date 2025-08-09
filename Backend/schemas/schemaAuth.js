const z = require('zod');

const registerSchema = z.object({
    email: z.string({required_error:'Se requiere un Email'}).z.email({message:'email invalido'}),
    password:z.string({required_error:'Contraseña requerida'}).min(6,{message:'La contraseña debe ser de al menos 6 caracteres' })
});

const loginSchema = z.object({
    email: z.string({required_error:'Se requiere un Email'}).z.email({message:'email invalido'}),
    password:z.string({required_error:'Contraseña requerida'}).min(6,{message:'La contraseña debe ser de al menos 6 caracteres' })

}) ;

module.exports = {registerSchema,loginSchema}

