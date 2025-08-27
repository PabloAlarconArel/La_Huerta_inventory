const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId, ref:'Product',required:true },
    quantity: {type:Number,required:true},
    price:{type:Number,required:true},
    expDate: {type:Date,default:Date.now},
    type: { type: String, required: true },
},{
    timestamps:true
})

module.exports = mongoose.model('Inventory', inventorySchema)
















