import { configureStore } from '@reduxjs/toolkit'
import user from './reducers/user'
import orders from './reducers/orders'

export default configureStore({
    reducer: {
        user,
        orders,
    },
})