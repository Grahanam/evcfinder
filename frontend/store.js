import {configureStore} from '@reduxjs/toolkit'

import authreducer from './src/features/auth/authslice'

const store=configureStore({
    reducer:{
        auth:authreducer,
    },
})

export default store