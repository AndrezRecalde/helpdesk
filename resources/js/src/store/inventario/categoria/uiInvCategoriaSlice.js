import { createSlice } from "@reduxjs/toolkit";

export const uiInvCategoriaSlice = createSlice({
    name: "uiInvCategoria",
    initialState: {
        isOpenModalInvCategoria: false,
    },
    reducers: {
        onOpenModalInvCategoria: (state, { payload }) => {
            state.isOpenModalInvCategoria = payload;
        },
    },
});

export const { onOpenModalInvCategoria } = uiInvCategoriaSlice.actions;
