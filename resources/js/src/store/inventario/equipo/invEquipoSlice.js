import { createSlice } from "@reduxjs/toolkit";

export const invEquipoSlice = createSlice({
    name: "invEquipo",
    initialState: {
        isLoading: false,
        isExport: false,
        invEquipos: [],
        paginacion: {
            total: 0,
            por_pagina: 0,
            pagina_actual: 0,
            ultima_pagina: 0,
            desde: 0,
            hasta: 0,
        },
        ultimosFiltros: {
            campo: "codigo",
            valor: "",
        },
        invEquiposBajas: [],
        activateInvEquipo: null,
        message: undefined,
        errores: undefined,
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onExport: (state, { payload }) => {
            state.isExport = payload;
        },
        onLoadInvEquipos: (state, { payload }) => {
            state.invEquipos = payload;
            state.isLoading = false;
        },
        onLoadPaginacion: (state, { payload }) => {
            state.paginacion = payload;
        },
        onSetUltimosFiltros: (state, { payload }) => {
            state.ultimosFiltros = payload;
        },
        onLoadInvEquiposBaja: (state, { payload }) => {
            state.invEquiposBajas = payload;
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
        onDeleteInvEquipo: (state) => {
            if (state.activateInvEquipo) {
                state.invEquipos = state.invEquipos.filter(
                    (equipo) => equipo.id === state.activateInvEquipo.id,
                );
            }
            state.activateInvEquipo = null;
            state.errores = undefined;
        },
        onRemoveUserFromEquipo: (state, { payload }) => {
            if (state.activateInvEquipo) {
                const userIdToRemove = payload; // El id del usuario a remover viene en el payload
                state.activateInvEquipo.usuarios =
                    state.activateInvEquipo.usuarios.filter(
                        (pivot) => pivot.id !== userIdToRemove,
                    );
            }
        },
        onRemoveDocumentoFromEquipo: (state, { payload }) => {
            if (state.activateInvEquipo) {
                const documentoIdToRemove = payload;
                state.activateInvEquipo.documentos =
                    state.activateInvEquipo.documentos.filter(
                        (pivot) => pivot.id !== documentoIdToRemove,
                    );
            }
        },
        onSetActivateInvEquipo: (state, { payload }) => {
            state.activateInvEquipo = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onClearInvEquipos: (state) => {
            state.invEquipos = [];
            state.paginacion = {
                total: 0,
                por_pagina: 0,
                pagina_actual: 0,
                ultima_pagina: 0,
                desde: 0,
                hasta: 0,
            };
            state.ultimosFiltros = {
                campo: "codigo",
                valor: "",
            };
            state.invEquiposBajas = [];
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
    onExport,
    onLoadInvEquipos,
    onLoadPaginacion,
    onSetUltimosFiltros,
    onLoadInvEquiposBaja,
    onAddInvEquipo,
    onUpdateInvEquipo,
    onDeleteInvEquipo,
    onRemoveUserFromEquipo,
    onRemoveDocumentoFromEquipo,
    onSetActivateInvEquipo,
    onSetActivateEquipoFromTransfer,
    onClearInvEquipos,
    onLoadMessage,
    onLoadErrores,
} = invEquipoSlice.actions;
