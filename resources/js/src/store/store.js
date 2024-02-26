import { configureStore } from "@reduxjs/toolkit";
import { authSlice, usersSlice } from "../store";
import { messageSlice } from "./message/messageSlice";



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer
    }
});
