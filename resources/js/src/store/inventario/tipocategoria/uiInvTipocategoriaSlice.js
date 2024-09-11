import { createSlice } from "@reduxjs/toolkit";

export const uiInvTipocategoriaSlice = createSlice({
    name: "uiInvTipoCategoria",
    initialState: {
        isOpenModalInvTipoCategoria: false,
    },
    reducers: {
        onOpenModalTipoCategoria: (state, { payload }) => {
            state.isOpenModalInvTipoCategoria = payload;
        },
    },
});

export const { onOpenModalTipoCategoria } = uiInvTipocategoriaSlice.actions;
