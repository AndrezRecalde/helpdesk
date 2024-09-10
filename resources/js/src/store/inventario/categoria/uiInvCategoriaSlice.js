import { createSlice } from "@reduxjs/toolkit";

export const uiInvCategoriaSlice = createSlice({
    name: "uiInvCategoria",
    initialState: {
        isOpenModalCategoria: false,
    },
    reducers: {
        onOpenModalCategoria: (state, { payload }) => {
            state.isOpenModalCategoria = payload;
        },
    },
});

export const { onOpenModalCategoria } = uiInvCategoriaSlice.actions;
