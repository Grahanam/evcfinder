const mongoose=require('mongoose')


const productSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    price:{
        type:Number,
    },
    category:{
        type:String,
        enum:['Apparel','Book','Sport']
    },
    description:{
        type:String
    },
    image:{
        url:{
            type:String
        },
        filepath:{
            type:String
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports=mongoose.model('Product',productSchema)