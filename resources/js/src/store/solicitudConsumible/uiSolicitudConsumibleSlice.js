import { createSlice } from "@reduxjs/toolkit";

export const uiSolicitudConsumibleSlice = createSlice({
    name: "uiSolicitudConsumible",
    initialState: {
        isOpenModalSolicitud: false,
        isOpenModalDetalle: false,
    },
    reducers: {
        onOpenModalSolicitud: (state, { payload }) => {
            state.isOpenModalSolicitud = payload;
        },
        onOpenModalDetalle: (state, { payload }) => {
            state.isOpenModalDetalle = payload;
        },
    },
});

export const { onOpenModalSolicitud, onOpenModalDetalle } =
    uiSolicitudConsumibleSlice.actions;
