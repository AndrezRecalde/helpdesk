import { createSlice } from "@reduxjs/toolkit";

export const uiMarcacionSlice = createSlice({
    name: "uiMarcacion",
    initialState: {
        isOpenModalGenerarReporte: false,
    },
    reducers: {
        onOpenModalGenerarReporte: (state, { payload }) => {
            state.isOpenModalGenerarReporte = payload;
        },
    },
});

export const { onOpenModalGenerarReporte } = uiMarcacionSlice.actions;
