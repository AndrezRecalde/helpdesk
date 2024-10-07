import { createSlice } from "@reduxjs/toolkit";

export const invConceptoSlice = createSlice({
    name: "invConcepto",
    initialState: {
        isLoading: false,
        invConceptos: [],
        activateConcepto: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadInvConceptos: (state, { payload }) => {
            state.invConceptos = payload;
            state.isLoading = false;
        },
        onAddInvConcepto: (state, { payload }) => {
            state.invConceptos.push(payload);
            state.isLoading = false;
        },
        onUpdateInvConcepto: (state, { payload }) => {
            state.invConceptos = state.invConceptos.map((concepto) => {
                if (concepto.id === payload.id) {
                    return payload;
                }
                return concepto;
            });
            state.activateConcepto = null;
            state.isLoading = false;
        },
        onDeleteInvConcepto: (state) => {
            if (state.activateConcepto) {
                state.invConceptos = state.invConceptos.filter(
                    (concepto) => concepto.id === state.activateConcepto.id
                );
            }
            state.activateConcepto = null;
            state.errores = undefined;
        },
        onSetActivateInvConcepto: (state, { payload }) => {
            state.activateConcepto = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvConceptos: (state) => {
            state.invConceptos = [];
            state.activateConcepto = null;
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
    onLoadInvConceptos,
    onAddInvConcepto,
    onUpdateInvConcepto,
    onDeleteInvConcepto,
    onSetActivateInvConcepto,
    onClearInvConceptos,
    onLoadMessage,
    onLoadErrores,
} = invConceptoSlice.actions;
