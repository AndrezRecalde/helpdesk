import { createSlice } from "@reduxjs/toolkit";

export const uiContratoSlice = createSlice({
    name: "uiContrato",
    initialState: {
        isOpenModalContrato: false,
    },
    reducers: {
        onOpenModalContrato: (state, { payload }) => {
            state.isOpenModalContrato = payload;
        },
    },
});

export const { onOpenModalContrato } = uiContratoSlice.actions;
