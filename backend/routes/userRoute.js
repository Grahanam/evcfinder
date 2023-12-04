const express=require('express')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const router=express.Router()

const userModel=require('../models/userModel')

router.post('/signup',async(req,res)=>{
    try{
      const {username,password}=req.body
      const existingUser=await userModel.findOne({username:username})
      if(existingUser){
        res.status(400).send({message:"Username already exists"})
      }else{
          const hashedpass=await bcrypt.hash(password,10)
          if(hashedpass){
            const user=new userModel({
                username,
                password:hashedpass,
            })

            const saveuser=await user.save()
            if(saveuser){
                res.status(200).send(saveuser)
            }else{
                res.status(500).send({message:"user saving error"})
            }
          }else{
            res.status(500).send({message:"Password not hashed correctly"})
          }
      }
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Internal server error"})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body
        const founduser=await userModel.findOne({username})
        // console.log(founduser)
        if(founduser){
            const checkpass=await bcrypt.compare(password,founduser.password)
            if(checkpass){
                const token=await jwt.sign({
                    userId:founduser._id,
                    username:founduser.username,
                },
                process.env.secretkey,
                    {expiresIn:"24h"}
                );
            res.status(200).send({message:"Login successful",token,user:founduser.username,userId:founduser._id})    

            }else{
                res.status(500).send({message:"Password does not match"})
            }

        }else{
            res.status(400).send({message:'User not found'})
        }

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server error"})
    }
})

module.exports=router



