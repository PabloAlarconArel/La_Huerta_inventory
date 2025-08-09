const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    barcode: {type:String ,required:true, unique:true},
    productName: {type:String,required:true},
    categories:{type:String},
    company:{type:String},
    priceUnity:{type:Number},
},{
    timestamps:true
})

module.exports = mongoose.model('Product', ProductSchema)