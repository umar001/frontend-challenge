import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"
export default configureStore({
    reducer: {
        userData: userReducer
    }
})