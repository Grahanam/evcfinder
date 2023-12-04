const express=require('express')
const router=express.Router()

const productModel=require('../models/productModel')
const userModel=require('../models/userModel')

router.post('/',async(req,res)=>{
    try{
        const username=req.body.username
        const finduser=await userModel.findOne({username:username})
        if(finduser){
            const newProduct=new productModel({
                title:req.body.title,
                category:req.body.category,
                price:req.body.price,
                description:req.body.description,
                user:finduser._id,
                // image:
            })
            const saveProduct=await newProduct.save()
            if(saveProduct){
                res.status(200).json({data:saveProduct})
            }else{
                res.status(500).send({message:"product saving error"})
            }
        }else{
            res.status(500).send({message:"User not Found!"})
        }

    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal Server Error"})
    }
})

router.get('/all',async(req,res)=>{
    try{
        const products=await productModel.find()
        res.status(200).json({message:"success",data:products})
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal Server Error"})
    }
})





module.exports=router