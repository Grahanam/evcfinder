import { createSlice } from "@reduxjs/toolkit";

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:null,
        loading:false,
        error:null
    },
    // reducers:{

    // },
    // extraReducers:(builder)=>{
    //     builder
    // }
})

export const{}=authSlice.actions

export default authSlice.reducer