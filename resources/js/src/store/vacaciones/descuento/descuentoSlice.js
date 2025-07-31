import { createSlice } from "@reduxjs/toolkit";
export const descuentoSlice = createSlice({
    name: "descuento",
    initialState: {
        isLoading: false,
        descuentos: [],
        activateDescuento: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadDescuentos: (state, { payload }) => {
            state.descuentos = payload;
            state.isLoading = false;
        },
        onSetActivateDescuento: (state, { payload }) => {
            state.activateDescuento = payload;
        },
        onClearDescuentos: (state) => {
            state.descuentos = [];
            state.activateDescuento = null;
            state.message = undefined;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onLoadDescuentos,
    onSetActivateDescuento,
    onClearDescuentos,
    onLoadMessage,
    onLoadErrores,
} = descuentoSlice.actions;
