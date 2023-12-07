import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, fetchProducts, fetchProductsByCategory, fetchUserProducts, updateProduct } from "../../actions/product/productAction";



export const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        categoryproducts:[],
        userproducts:[],
        message:'',
        loading:false,
        success:false,
        error:null,
        createloading:false,
        createerror:null,
        createsuccess:false,
        createmessage:'',
        updateloading:false,
        updateerror:null,
        updatesuccess:false,
        updatemessage:'',
        deleteloading:false,
        deleteerror:null,
        deletesuccess:false,
        deletemessage:''
    },
    reducers:{
        logout:(state)=>{
            state.token=null
            del('TOKEN')
        },
        clearcreatemessage:(state)=>{
            state.createmessage=''
        },
        changecreatesuccess:(state)=>{
            state.createsuccess=false
        },
        changeupdatesuccess:(state)=>{
            state.updatesuccess=false
        },
        changedeletesuccess:(state)=>{
          state.deletesuccess=false
      }
    },
    extraReducers:(builder)=>{
        //Fetch All products
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        builder.addCase(fetchProducts.fulfilled,(state,action)=>{
            const payload=action.payload
            state.products=payload.data
            state.loading=false  
        })
        builder.addCase(fetchProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

        //Fetch Products By Category
        builder.addCase(fetchProductsByCategory.pending, state => {
            state.categoryproducts=[]
            state.loading = true
            state.error=null
          })
          builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
            const payload=action.payload
            state.categoryproducts=payload.data
            state.loading = false
          })
          builder.addCase(fetchProductsByCategory.rejected, state => {
            state.loading = false
            state.error=action.error.message
          })
        
          //Fetch User Products
          builder.addCase(fetchUserProducts.pending, state => {
            state.loading = true
            state.error=null
          })
          builder.addCase(fetchUserProducts.fulfilled, (state, action) => {
            const payload=action.payload
            state.userproducts=payload.data
            state.loading = false
          })
          builder.addCase(fetchUserProducts.rejected, state => {
            state.loading = false
            state.error=action.error.message
          })

          //Create Product
          builder.addCase(createProduct.pending, state => {
            state.createloading = true
            state.createerror=null
            state.createsuccess=false
          })
          builder.addCase(createProduct.fulfilled, (state, action) => {
            const payload=action.payload
            if(payload.data){
                state.createsuccess=true
                state.createmessage=payload.message
            }
            state.createloading = false
          })
          builder.addCase(createProduct.rejected, state => {
            state.createloading = false
            state.createerror=action.error.message
          })
        
          //Update Product
          builder.addCase(updateProduct.pending, state => {
            state.updateloading = true
            state.updateerror=null
            state.updatesuccess=false
          })
          builder.addCase(updateProduct.fulfilled, (state, action) => {
            const payload=action.payload
            if(payload.data){
                state.updatesuccess=true
                state.updatemessage=payload.message
            }
            state.updateloading = false
          })
          builder.addCase(updateProduct.rejected, state => {
            state.updateloading = false
            state.updateerror=action.error.message
          })
          
          //Delete Product
          builder.addCase(deleteProduct.pending, state => {
            state.deleteloading = true
            state.deleteerror=null
            state.deletesuccess=false
          })
          builder.addCase(deleteProduct.fulfilled, (state, action) => {
            const payload=action.payload
            if(payload.data){
                state.deletesuccess=true
                state.deletemessage=payload.message
            }
            state.deleteloading = false
          })
          builder.addCase(deleteProduct.rejected, state => {
            state.deleteloading = false
            state.deleteerror=action.error.message
          })


    }
})

export const{logout,clearcreatemessage,changecreatesuccess,changeupdatesuccess,changedeletesuccess}=productSlice.actions

export default productSlice.reducer