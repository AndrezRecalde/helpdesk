import { createSlice } from "@reduxjs/toolkit";

export const uiInvTipocategoriaSlice = createSlice({
    name: "uiInvTipoCategoria",
    initialState: {
        isOpenModalTipoCategoria: false,
    },
    reducers: {
        onOpenModalTipoCategoria: (state, { payload }) => {
            state.isOpenModalTipoCategoria = payload;
        },
    },
});

export const { onOpenModalTipoCategoria } = uiInvTipocategoriaSlice.actions;
