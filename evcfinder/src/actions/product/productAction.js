import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchProducts=createAsyncThunk('product/fetchProducts',async()=>{
    try{
        const response=await fetch('http://192.168.1.7:4000/product/all',{
            method:'GET',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
        })
        const data=await response.json()
        return data
    }catch(err){
        console.log(err)
        throw err
    }
})




export const fetchProductsByCategory=createAsyncThunk('product/fetchProductsByCategory',async(category)=>{
    try{
        const response=await fetch(`http://192.168.1.7:4000/product/category/${category}`,{
            method:'GET',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
        })
        const data=await response.json()
        return data
    }catch(err){
        console.log(err)
        throw err
    }
})

export const fetchUserProducts=createAsyncThunk('product/fetchUserProducts',async(user)=>{
    try{
        const response=await fetch(`http://192.168.1.7:4000/product/user/${user}`,{
            method:'GET',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
        })
        const data=await response.json()
        return data
    }catch(err){
        console.log(err)
        throw err
    }
})


export const createProduct=createAsyncThunk('product/createProduct',async(body)=>{
    try{
        const response=await fetch(`http://192.168.1.7:4000/product`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
            },
            body:body
        })
        const data=await response.json()
        return data
    }catch(err){
        throw err
    }
})

export const updateProduct=createAsyncThunk('product/updateProduct',async(body)=>{
    try{
        const response=await fetch(`http://192.168.1.7:4000/product`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
            },
            body:body
        })
        const data=await response.json()
        return data
    }catch(err){
        throw err
    }
})

export const deleteProduct=createAsyncThunk('product/deleteProduct',async(id)=>{
    try{
        const response=await fetch(`http://192.168.1.7:4000/product/${id}`,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
            }
        })
        const data=await response.json()
        return data
    }catch(err){
        throw err
    }
})