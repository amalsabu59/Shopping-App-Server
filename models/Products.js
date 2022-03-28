const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
       
    },
    desc:{
        type: String,
        require: true,
       
    },
    img:{
        type: String,
        required: true,  
    },
    categories:{
        type: Array,
        
    },
    size:{
        type: String,
        
    },
    color:{
        type: String,
         
    },
    price:{
        type: Number,
        required: true,  
    },
    
    
    
},{timestamp: true})

module.exports = mongoose.model("Products",ProductSchema)