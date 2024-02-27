import { configureStore } from "@reduxjs/toolkit";
import { authSlice, usersSlice } from "../store";



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer
    }
});
