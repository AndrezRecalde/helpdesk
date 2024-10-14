import { createSlice } from "@reduxjs/toolkit";

export const uiInvCategoriaSlice = createSlice({
    name: "uiInvCategoria",
    initialState: {
        isOpenModalInvCategoria: false,
        isOpenModalStockInvCategoria: false,
    },
    reducers: {
        onOpenModalInvCategoria: (state, { payload }) => {
            state.isOpenModalInvCategoria = payload;
        },
        onOpenModalStockInvCategoria: (state, { payload }) => {
            state.isOpenModalStockInvCategoria = payload;
        },
    },
});

export const { onOpenModalInvCategoria, onOpenModalStockInvCategoria } =
    uiInvCategoriaSlice.actions;
