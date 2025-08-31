const Sale = require("../models/Sales");
const Inventory = require("../models/Inventory");

const getSales = async (req, res) =>{
    const sale = await Sale.find()
    res.json(sale)
}
const createSale = async (req,res)=>{

    try{
        const ProductList = req.body.products;
        let total = 0;
        const saleProducts = [];
        
        for (const item of ProductList){
            let quantity = item.quantity;
            const inventories = await Inventory.find({ product : item.product})
            .sort({createdAt:1});

            for(let i = 0 ; i < inventories.length; i++){
                const inv = inventories[i];
                if(quantity <=0 ) break;

                if(inv.quantityAvailable >= quantity){
                    inv.quantityAvailable -= quantity;
                    await inv.save();
                    quantity=0;
                }else{
                    if (inv.quantityAvailable >= 0){
                    quantity -=inv.quantityAvailable;
                    inv.quantityAvailable = 0;
                    await inv.save();}

                }
            }
        
            if (quantity > 0) {
                let negativeInv = await Inventory.findOne({
                product: item.product,
                quantityInitial: { $lt: 0 }
                });
                if (negativeInv) {
                    negativeInv.quantityInitial -= quantity;
                    negativeInv.quantityAvailable -= quantity;
                    await negativeInv.save();
                } else {
                    await Inventory.create({
                        product: item.product,
                        quantityInitial: -quantity,
                        quantityAvailable: -quantity,
                        price: item.price,
                        expDate: new Date()
                    })};
        }

        const subtotal = item.price * item.quantity;
        total += subtotal;

        saleProducts.push({
            products : item.product,
            quantity:item.quantity,
            price: item.price

        });
    
        }      
        const newSale = new Sale({
            products : saleProducts,
            total
        });
        
        await newSale.save();
        res.status(201).json(newSale)

    }catch (error){
        res.status(400).json({error:error.message});
    }
};
const getSale = async (req, res) =>{
    const sale= await Sale.findById(req.params.id)
    if (!sale) return res.status(404).json({message:"Venta no encontrada"});
    res.json(product)
};
const deleteSales = async (req, res) =>{
    const sale= await Sale.findByIdAndDelete(req.params.id)
    if (!sale) return res.status(404).json({message:"Venta no encontrada"});
    res.sendStatus(204);
};

module.exports ={getSales,createSale,getSale,deleteSales}