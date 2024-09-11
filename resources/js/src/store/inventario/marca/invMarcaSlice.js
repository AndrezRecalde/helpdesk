import { createSlice } from "@reduxjs/toolkit";

export const invMarcaSlice = createSlice({
    name: "invMarca",
    initialState: {
        isLoading: false,
        invMarcas: [],
        activateInvMarca: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadInvMarcas: (state, { payload }) => {
            state.invMarcas = payload;
            state.isLoading = false;
        },
        onAddInvMarca: (state, { payload }) => {
            state.invMarcas.push(payload);
            state.isLoading = false;
        },
        onUpdateInvMarca: (state, { payload }) => {
            state.invMarcas = state.invMarcas.map((marca) => {
                if (marca.id === payload.id) {
                    return payload;
                }
                return marca;
            });
            state.activateInvMarca = null;
            state.isLoading = false;
        },
        onDeleteInvMarca: (state) => {
            if (state.activateInvMarca) {
                state.invMarcas = state.invMarcas.filter(
                    (marca) => marca.id === state.activateInvMarca.id
                );
            }
            state.activateInvMarca = null;
            state.errores = undefined;
        },
        onSetActivateInvMarca: (state, { payload }) => {
            state.activateInvMarca = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvMarcas: (state) => {
            state.invMarcas = [];
            state.activateInvMarca = null;
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
    onLoadInvMarcas,
    onAddInvMarca,
    onUpdateInvMarca,
    onDeleteInvMarca,
    onSetActivateInvMarca,
    onClearInvMarcas,
    onLoadMessage,
    onLoadErrores,
} = invMarcaSlice.actions;
