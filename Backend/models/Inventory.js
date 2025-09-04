const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product',required:true },
    quantityInitial: {type:Number,required:true},
    quantityAvailable: {type:Number,required:true},
    price:{type:Number,required:true},
    expDate: {type:Date,default:Date.now},
},{
    timestamps:true
})

module.exports = mongoose.model('Inventory', inventorySchema)
















