import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import { Authlogin,Authsignup } from "../../actions/auth/authAction";

async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    return result
}

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  async function del(key) {
    await SecureStore.deleteItemAsync(key);
  }

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:null,
        username:null,
        uId:null,
        message:'',
        data:[],
        loading:false,
        success:false,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.token=null
            del('TOKEN')
        },
        clearmessage:(state)=>{
            state.message=''
        },
        changesuccess:(state)=>{
            state.success=false
        }
    },
    extraReducers:(builder)=>{
        //Login
        builder.addCase(Authlogin.pending,(state)=>{
            state.message=''
            state.loading=true
            state.error=null
            state.success=false
        })
        builder.addCase(Authlogin.fulfilled,(state,action)=>{
            const payload=action.payload
            if(payload.token){
               state.token=payload.token
               state.username=payload.user
               state.uId=payload.userId
               save("TOKEN",payload.token)
            }else{
               state.message=payload.message
            } 
            state.loading=false  
        })
        builder.addCase(Authlogin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
            state.message=action.error.message
        })

        //Signup
        builder.addCase(Authsignup.pending, state => {
            state.message=''
            state.loading = true
            state.error=null
            state.success=false
          })
          builder.addCase(Authsignup.fulfilled, (state, action) => {
            const payload=action.payload
            if(payload.user){
                 state.success=true
                 state.message=`User created:${payload.user?.username}`
            }else{
                state.message=payload.message
            }
            state.loading = false
          })
          builder.addCase(Authsignup.rejected, state => {
            state.loading = false
          })

    }
})

export const{logout,clearmessage,changesuccess}=authSlice.actions

export default authSlice.reducer