import { createSlice } from "@reduxjs/toolkit";

export const invEquipoSlice = createSlice({
    name: "invEquipo",
    initialState: {
        isLoading: false,
        invEquipos: [],
        activateInvEquipo: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadInvEquipos: (state, { payload }) => {
            state.invEquipos = payload;
            state.isLoading = false;
        },
        onAddInvEquipo: (state, { payload }) => {
            state.invEquipos.push(payload);
            state.isLoading = false;
        },
        onUpdateInvEquipo: (state, { payload }) => {
            state.invEquipos = state.invEquipos.map((equipo) => {
                if (equipo.id === payload.id) {
                    return payload;
                }
                return equipo;
            });
            state.activateInvEquipo = null;
            state.isLoading = false;
        },
        onDeleteInvEquipo: (state, { payload }) => {
            if (state.activateInvEquipo) {
                state.invEquipos = state.invEquipos.filter(
                    (equipo) => equipo.id === state.activateInvEquipo.id
                );
            }
            state.activateInvEquipo = null;
            satisfies.errores = undefined;
        },
        onSetActivateInvEquipo: (state, { payload }) => {
            state.activateInvEquipo = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvEquipos: (state, { payload }) => {
            state.invEquipos = [];
            state.activateInvEquipo = null;
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
    onLoadInvEquipos,
    onAddInvEquipo,
    onUpdateInvEquipo,
    onDeleteInvEquipo,
    onSetActivateInvEquipo,
    onClearInvEquipos,
    onLoadMessage,
    onLoadErrores,
} = invEquipoSlice.actions;
