const express=require('express')
const router=express.Router()
const UUID = require("uuid-v4");

const productModel=require('../models/productModel')
const userModel=require('../models/userModel')
const bucket=require('../firebaseadmin')
const uploadFile=require('../firebasestorage/upload')

const multer=require('multer')
const upload = multer({ storage: multer.memoryStorage() });


router.post('/',upload.single('file'),async(req,res)=>{
    try{
        // console.log(req.file)
        const file=req.file

        const userid=req.body.user
        const finduser=await userModel.findOne({_id:userid})
        if(finduser){
            const filename = `evcfinder/product_img/${Date.now()}_${file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(file.buffer, filename,file.mimetype,uuid);
            const newProduct=new productModel({
                title:req.body.title,
                category:req.body.category,
                price:req.body.price,
                description:req.body.description,
                image:{
                    url:fileURL,
                    filepath:filename
                },
                user:finduser._id,
            })
            const saveProduct=await newProduct.save()
            if(saveProduct){
                return res.status(200).json({message:"New Product created!",data:saveProduct})
            }else{
                return res.status(500).send({message:"product saving error"})
            }
        }else{
            return res.status(500).send({message:"User not Found!"})
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

router.put('/',upload.single('file'),async(req,res)=>{
    try{
        if(!req.file){
            const product=await productModel.findByIdAndUpdate(req.body._id,req.body,{new:true})
            res.status(200).json({data:product,message:`${product.title} Updated!`})
          }else{

            const product=await productModel.findById(req.body._id)

            await bucket.file(product.image.filepath).delete()
            
            const filename = `evcfinder/product_img/${Date.now()}_${req.file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
            const image={
               url:fileURL,
               filepath:filename
            }
            product.title=req.body.title
            product.category=req.body.category,
            product.price=req.body.price,
            product.description=req.body.description,
            product.image=image
            const updateproduct=await productModel.findByIdAndUpdate(product._id,product,{new:true})
            res.status(200).json({data:updateproduct,message:`${product.title} Updated!`})
          }

    }catch(err){
        console.log(err)
        res.status(500).send({message:'Internal Server Error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const product=await productModel.findById(req.params.id)
        await bucket.file(product.image.filepath).delete()
        await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({data:product,message:`${product.title} deleted!`})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error'})
    } 
})

router.get('/user/:id',async(req,res)=>{
    try{
        const products=await productModel.find({user:req.params.id})
        res.status(200).json({message:"success",data:products})
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal Server Error"})
    }
})

router.get('/category/:name',async(req,res)=>{
    try{
        const products=await productModel.find({category:req.params.name})
        res.status(200).json({message:"success",data:products})
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal Server Error"})
    }
})





module.exports=router