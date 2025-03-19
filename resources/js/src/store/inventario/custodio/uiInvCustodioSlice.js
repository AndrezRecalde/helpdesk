import { createSlice } from "@reduxjs/toolkit";

export const uiInvCustodioSlice = createSlice({
    name: "uiInvCustodio",
    initialState: {
        isOpenModalAsignarCustodio: false,
    },
    reducers: {
        onOpenModalAsignarCustodio: (state, { payload }) => {
            state.isOpenModalAsignarCustodio = payload;
        },
    },
});

export const {
    onOpenModalAsignarCustodio
} = uiInvCustodioSlice.actions;
