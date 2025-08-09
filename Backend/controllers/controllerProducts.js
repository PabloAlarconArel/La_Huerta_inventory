const Product = require('../models/Product')


const getProducts = async (req, res) =>{
    const product = await Product.find()
    res.json(product)

};
const createProducts = async (req, res) =>{
    const{barcode,productName,categories,company,priceUnity}= req.body

    const newProduct = new Product({
        barcode,
        productName,
        categories,
        company,
        priceUnity,
    })
    const savedProduct = await newProduct.save();
    res.json(savedProduct)

};
const getProduct = async (req, res) =>{
    const product= await Product.findById(req.params.id)
    if (!product) return res.status(404).json({message:"Producto no encontrado"});
    res.json(product)
};
const updateProducts = async (req, res) =>{
    const product= await Product.findByIdAndUpdate(req.params.id,req.body,{ new:true,});
    if (!product) return res.status(404).json({message:"Producto no encontrado"})
    res.json(product)


};
const deleteProducts = async (req, res) =>{
    const product= await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({message:"Producto no encontrado"});
    res.sendStatus(204);
};

module.exports ={getProducts,createProducts,getProduct,updateProducts,deleteProducts};