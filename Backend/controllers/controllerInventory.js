const Inventory = require('../models/Inventory');


const getInventories = async (req, res) =>{
    try {
    const inventories = await Inventory.find().populate("product", "productName company categories barcode");
    res.json(inventories);
    } catch (error) {
    res.status(500).json({ message: "Error al obtener inventarios", error: error.message });
    }

};
const createInventory = async (req, res) =>{
    try{
        const{product,quantity,pricePack,expDate,lote}= req.body
    
        const newInventory = new Inventory({
                product,
                quantity,
                pricePack,
                expDate,
        })
        const savedInventory = await newInventory.save();
        res.json(savedInventory)
    }catch(error){
        res.status(500).json({ message: "Error al crear inventario", error: error.message });
    }
};
const getInventory = async (req, res) =>{
    try{
        const inventory= await Inventory.findById(req.params.id).populate("product", "productName company");
        if (!inventory) return res.status(404).json({message:"Inventario no encontrado"});
        res.json(inventory)
    }catch(error){
        res.status(500).json({ message: "Error al obtener inventario", error: error.message });
    }
};
const updateInventory = async (req, res) =>{
    try{
        const inventory= await Inventory.findByIdAndUpdate(req.params.id,req.body,{ new:true,})
        .populate("product", "productName company categories barcode");
        if (!inventory) return res.status(404).json({message:"Inventario no encontrado"})
        res.json(inventory)
    }catch(error){
        res.status(500).json({ message: "Error al actualizar inventario", error: error.message });
    }


};
const deleteInventory = async (req, res) =>{
    const inventory= await Inventory.findByIdAndDelete(req.params.id)
    if (!inventory) return res.status(404).json({message:"Inventario no encontrado"});
    res.sendStatus(204);
};


module.exports ={getInventories,createInventory,getInventory,updateInventory,deleteInventory};