import { createSlice } from "@reduxjs/toolkit";

export const uiInvPerifericoSlice = createSlice({
    name: "uiInvPeriferico",
    initialState: {
        isOpenModalPeriferico: false,
        isOpenModalTransferirPeriferico: false,
        isOpenModalPerifericoAsignarEquipo: false,
    },
    reducers: {
        onOpenModalInvPeriferico: (state, { payload }) => {
            state.isOpenModalPeriferico = payload;
        },
        onOpenModalTransferirPeriferico: (state, { payload }) => {
            state.isOpenModalTransferirPeriferico = payload;
        },
        onOpenModalPerifericoAsignarEquipo: (state, { payload }) => {
            state.isOpenModalPerifericoAsignarEquipo = payload;
        },
    },
});

export const {
    onOpenModalInvPeriferico,
    onOpenModalTransferirPeriferico,
    onOpenModalPerifericoAsignarEquipo,
} = uiInvPerifericoSlice.actions;
