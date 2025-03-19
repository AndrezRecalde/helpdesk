import { createSlice } from "@reduxjs/toolkit";
export const uiInvConsumibleSlice = createSlice({
    name: "uiInvConsumible",
    initialState: {
        isOpenModalInvConsumible: false,
        isOpenModalStockInvConsumible: false,
        isOpenModalSolicitudConsumible: false,
        isOpenModalHistorialConsumible: false,
    },
    reducers: {
        onOpenModalInvConsumible: (state, { payload }) => {
            state.isOpenModalInvConsumible = payload;
        },
        onOpenModalStockInvConsumible: (state, { payload }) => {
            state.isOpenModalStockInvConsumible = payload;
        },
        onOpenModalSolicitudConsumible: (state, { payload }) => {
            state.isOpenModalSolicitudConsumible = payload;
        },
        onOpenModalHistorialConsumible: (state, { payload }) => {
            state.isOpenModalHistorialConsumible = payload;
        },
    },
});

export const {
    onOpenModalInvConsumible,
    onOpenModalStockInvConsumible,
    onOpenModalSolicitudConsumible,
    onOpenModalHistorialConsumible,
} = uiInvConsumibleSlice.actions;
