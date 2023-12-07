require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()
const Port=process.env.port||4000
const mongoDBUrl=process.env.mongoDBUrl

//Routes
const userRoute=require('./routes/userRoute')
const productRoute=require('./routes/productRoute')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/',userRoute)
app.use('/product',productRoute)


app.listen(Port,()=>{
    console.log(`Server running on Port:${Port}`)
})


//Database
mongoose.connect(mongoDBUrl)
const db=mongoose.connection
db.on('error',(error)=>{
    console.error('MongoDB connection error:',error)
})
db.once('open',()=>{
    console.log('Connected to MongoDB')
})