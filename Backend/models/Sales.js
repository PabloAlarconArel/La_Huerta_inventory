const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
    products:[{
        product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,required:true},
        price:{type:Number,required:true}
    }],
    total:{type:Number,required:true},
},{
    timestamps:true
});

module.exports= mongoose.model("Sale",salesSchema);  