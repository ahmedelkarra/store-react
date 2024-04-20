import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
    name: 'products',
    initialState: {
        orders: [],
    },
    reducers: {
        addOrder: (state, action) => {
            let data = action.payload
            state.orders.push(data)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrder } = ordersSlice.actions

export default ordersSlice.reducer 