import { configureStore } from "@reduxjs/toolkit";
import { authSlice, direccionSlice, empresaSlice, uiUserSlice, usersSlice } from "../store";



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        uiUser: uiUserSlice.reducer,
        empresa: empresaSlice.reducer,
        direccion: direccionSlice.reducer
    }
});
