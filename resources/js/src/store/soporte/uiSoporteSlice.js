import { createSlice } from "@reduxjs/toolkit";

export const uiSoporteSlice = createSlice({
    name: "varName",
    initialState: {
        isOpenModalAsignarSoporte: false,
        isOpenModalAnularSoporte: false,
        isOpenModalAddSoporte_T: false,
        isOpenModalAddSoporte_G: false,
    },
    reducers: {
        onOpenModalAsignarSoporte: (state) => {
            state.isOpenModalAsignarSoporte = true;
        },
        onCloseModalAsignarSoporte: (state) => {
            state.isOpenModalAsignarSoporte = false;
        },
        onOpenModalAnularSoporte: (state) => {
            state.isOpenModalAnularSoporte = true;
        },
        onCloseModalAnularSoporte: (state) => {
            state.isOpenModalAnularSoporte = false;
        },
        onOpenModalAddSoporte_T: (state) => {
            state.isOpenModalAddSoporte_T = true;
        },
        onCloseModalAddSoporte_T: (state) => {
            state.isOpenModalAddSoporte_T = false;
        },
        onOpenModalAddSoporte_G: (state) => {
            state.isOpenModalAddSoporte_G = true;
        },
        onCloseModalAddSoporte_G: (state) => {
            state.isOpenModalAddSoporte_G = false;
        },
    },
});

export const {
    onOpenModalAsignarSoporte,
    onCloseModalAsignarSoporte,
    onOpenModalAnularSoporte,
    onCloseModalAnularSoporte,
    onOpenModalAddSoporte_T,
    onCloseModalAddSoporte_T,
    onOpenModalAddSoporte_G,
    onCloseModalAddSoporte_G,
} = uiSoporteSlice.actions;
