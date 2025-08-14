const Inventory = require('../models/Inventory');


const getInventorys = async (req, res) =>{
    const inventory = await Inventory.find()
    res.json(inventory)

};
const createInventory = async (req, res) =>{
    const{quantity,pricePack,expDate,lote}= req.body

    const newInventory = new Inventory({
            quantity,
            pricePack,
            expDate,
            lote,
    })
    const savedInventory = await newInventory.save();
    res.json(savedInventory)

};
const getInventory = async (req, res) =>{
    const inventory= await Inventory.findById(req.params.id)
    if (!inventory) return res.status(404).json({message:"Inventario no encontrado"});
    res.json(inventory)
};
const updateInventory = async (req, res) =>{
    const inventory= await Inventory.findByIdAndUpdate(req.params.id,req.body,{ new:true,});
    if (!inventory) return res.status(404).json({message:"Inventario no encontrado"})
    res.json(inventory)


};
const deleteInventory = async (req, res) =>{
    const inventory= await Inventory.findByIdAndDelete(req.params.id)
    if (!inventory) return res.status(404).json({message:"Inventario no encontrado"});
    res.sendStatus(204);
};

module.exports ={getInventorys,createInventory,getInventory,updateInventory,deleteInventory};