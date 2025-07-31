import { createSlice } from "@reduxjs/toolkit";
export const uiDescuentoSlice = createSlice({
    name: "uiDescuento",
    initialState: {
        isOpenModalAddDescuento: false,
    },
    reducers: {
        onOpenModalAddDescuento: (state, { payload }) => {
            state.isOpenModalAddDescuento = payload;
        },
    },
});

export const { onOpenModalAddDescuento } = uiDescuentoSlice.actions;
