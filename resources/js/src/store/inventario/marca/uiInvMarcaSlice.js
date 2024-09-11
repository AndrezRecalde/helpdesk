import { createSlice } from "@reduxjs/toolkit";

export const uiInvMarcaSlice = createSlice({
    name: "uiInvMarca",
    initialState: {
        isOpenModalInvMarca: false,
    },
    reducers: {
        onOpenModalInvMarca: (state, { payload }) => {
            state.isOpenModalInvMarca = payload;
        },
    },
});

export const { onOpenModalInvMarca } = uiInvMarcaSlice.actions;
