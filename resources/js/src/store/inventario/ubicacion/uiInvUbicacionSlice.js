import { createSlice } from "@reduxjs/toolkit";

export const uiInvUbicacionSlice = createSlice({
    name: "invUiUbicacion",
    initialState: {
        isOpenModalInvUbicacion: false,
    },
    reducers: {
        onOpenModalInvUbicacion: (state, { payload }) => {
            state.isOpenModalInvUbicacion = payload;
        },
    },
});

export const { onOpenModalInvUbicacion } = uiInvUbicacionSlice.actions;
