const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product',required:true },
    quantity: {type:Number,required:true},
    pricePack:{type:Number,required:true},
    expDate: {type:Date,default:Date.now,required:true},
    lote: {type:Number, unique:true},
},{
    timestamps:true
})

module.exports = mongoose.model('Inventory', inventorySchema)
















