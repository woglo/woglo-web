import {createSlice} from '@reduxjs/toolkit'


const initialValues = {
    userDetails:{},
    token:null
}

 const authSlice = createSlice({
    name:"authSlice",
    initialState:initialValues,
    reducers:{
        loginData:(state,action)=>{
            state.userDetails = action.payload
        },
        logout:(state)=>{
            state.userDetails = {}
            state.token = null
        }
    }
})

export const {loginData,logout} = authSlice.actions
export default authSlice.reducer;