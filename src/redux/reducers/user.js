import { createSlice } from '@reduxjs/toolkit'
import { errorMsg, sccsessMsg } from '../../components/infoMsg'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        online: false,
        isAdmin: false,
        loading: true,
        users: [],
        user: {},
        category: [],
    },
    reducers: {
        login: (state, action) => {
            state.online = true
            state.user = action.payload
        },
        logout: (state) => {
            state.online = false
            state.user = {}
        },
        addUser: (state, action) => {
            let id = Date.now()
            let data = action.payload
            let dublicated = state.users.some((user) => user.email === data.email)
            if (dublicated) return errorMsg("Email is already taken")
            state.users.push({ ...action.payload, id })
            sccsessMsg("Account has been created")
        },
        addcategory: (state, action) => {
            state.category = action.payload
        },
        doneLoading: (state) => {
            state.loading = false
        },
        updateDeta: (state, action) => {
            let data = action.payload
            const users = state.users.find((ele) => {
                if (data.id === ele.id) {
                    return data
                } else {
                    return ele
                }
            })
            state.users = users
        }
    },
})

export const { login, logout, addUser, addcategory, doneLoading, updateDeta } = userSlice.actions

export default userSlice.reducer 