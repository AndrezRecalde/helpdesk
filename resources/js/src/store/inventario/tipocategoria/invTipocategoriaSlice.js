import { createSlice } from "@reduxjs/toolkit";

export const invTipocategoriaSlice = createSlice({
    name: "invTipoCategoria",
    initialState: {
        isLoading: false,
        tiposcategorias: [],
        activateTipocategoria: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadInvTiposcategorias: (state, { payload }) => {
            state.tiposcategorias = payload;
            state.isLoading = false;
        },
        onAddInvTipocategoria: (state, { payload }) => {
            state.tiposcategorias.push(payload);
            state.isLoading = false;
        },
        onUpdateInvTipocategoria: (state, { payload }) => {
            state.tiposcategorias = state.tiposcategorias.map((tipo) => {
                if (tipo.id === payload.id) {
                    return payload;
                }
                return tipo;
            });
            state.activateTipocategoria = null;
            state.isLoading = false;
        },
        onDeleteInvTipocategoria: (state) => {
            if (state.activateTipocategoria) {
                state.tiposcategorias = state.tiposcategorias.filter(
                    (tipo) => tipo.id === state.activateTipocategoria.id
                );
            }
            state.activateTipocategoria = null;
            state.errores = undefined;
        },
        onSetActivateInvTipocategoria: (state, { payload }) => {
            state.activateTipocategoria = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvTipocategorias: (state) => {
            state.tiposcategorias = [];
            state.activateTipocategoria = null;
            state.isLoading = false;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
            state.isLoading = false;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
    },
});

export const {
    onLoading,
    onLoadInvTiposcategorias,
    onAddInvTipocategoria,
    onUpdateInvTipocategoria,
    onDeleteInvTipocategoria,
    onSetActivateInvTipocategoria,
    onClearInvTipocategorias,
    onLoadMessage,
    onLoadErrores,
} = invTipocategoriaSlice.actions;
