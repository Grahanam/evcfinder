import { createAsyncThunk } from "@reduxjs/toolkit";



export const Authlogin=createAsyncThunk('auth/login',async(body)=>{
    try{
        const response=await fetch('http://192.168.1.7:4000/login',{
            method:'POST',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
            body:JSON.stringify(body)
        })
        const data=await response.json()
        return data
    }catch(err){
        console.log(err)
        throw err
    }
})


export const Authsignup=createAsyncThunk('auth/sigup',async(body)=>{
    try{
        const response=await fetch('http://192.168.1.7:4000/signup',{
            method:'POST',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
            body:JSON.stringify(body)
        })
        const data=await response.json()
        return data
    }catch(err){
        console.log(err)
        throw err
    }
})