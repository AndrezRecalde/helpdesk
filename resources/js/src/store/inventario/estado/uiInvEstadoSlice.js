import { createSlice } from "@reduxjs/toolkit";

export const uiInvEstadoSlice = createSlice({
    name: "uiInvEstado",
    initialState: {
        isOpenModalInvEstado: false,
    },
    reducers: {
        onOpenModalInvEstado: (state, { payload }) => {
            state.isOpenModalInvEstado = payload;
        },
    },
});

export const { onOpenModalInvEstado } = uiInvEstadoSlice.actions;
