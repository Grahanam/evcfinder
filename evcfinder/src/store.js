import {configureStore} from '@reduxjs/toolkit'

import authreducer from './features/auth/authslice'
import productreducer from './features/Product/productSlice'

const store=configureStore({
    reducer:{
        auth:authreducer,
        product:productreducer,
    },
})

export default store