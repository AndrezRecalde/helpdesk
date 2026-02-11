import { createSlice } from "@reduxjs/toolkit";
export const descuentoSlice = createSlice({
    name: "descuento",
    initialState: {
        isLoading: false,
        descuentos: [],
        activateDescuento: null,
        message: undefined,
        errores: undefined,
        paginacion: {
            total: 0,
            por_pagina: 15,
            pagina_actual: 1,
            ultima_pagina: 1,
            desde: 0,
            hasta: 0,
        },
        ultimosFiltros: {
            usuario_id: null,
            anio: null,
        },
    },
    reducers: {
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onLoadDescuentos: (state, { payload }) => {
            state.descuentos = payload;
            state.isLoading = false;
        },
        onSetActivateDescuento: (state, { payload }) => {
            state.activateDescuento = payload;
        },
        onClearDescuentos: (state) => {
            state.descuentos = [];
            state.activateDescuento = null;
            state.ultimosFiltros = {
                usuario_id: null,
                anio: null,
            };
            state.paginacion = {
                total: 0,
                por_pagina: 15,
                pagina_actual: 1,
                ultima_pagina: 1,
                desde: 0,
                hasta: 0,
            };
            state.message = undefined;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.errores = payload;
            state.isLoading = false;
        },
        onSetPaginacion: (state, { payload }) => {
            state.paginacion = payload;
        },
        onSetUltimosFiltros: (state, { payload }) => {
            state.ultimosFiltros = payload;
        },
    },
});

export const {
    onLoading,
    onLoadDescuentos,
    onSetActivateDescuento,
    onClearDescuentos,
    onLoadMessage,
    onLoadErrores,
    onSetPaginacion,
    onSetUltimosFiltros,
} = descuentoSlice.actions;
