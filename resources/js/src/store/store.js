import { configureStore } from "@reduxjs/toolkit";
import { authSlice, direccionSlice, uiUserSlice, usersSlice } from "../store";



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        uiUser: uiUserSlice.reducer,
        direccion: direccionSlice.reducer
    }
});
