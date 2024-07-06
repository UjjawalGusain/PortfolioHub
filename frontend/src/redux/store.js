import {configureStore} from "@reduxjs/toolkit"
import autoReducer from "./auth/authSlice.js" 

const store = configureStore({
    reducer: autoReducer
})

export default store;
