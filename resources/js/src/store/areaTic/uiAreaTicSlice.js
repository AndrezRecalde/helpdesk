import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalActionAreaTic: false,
    modalDeleteAreaTic: false,
    modalAsignarTecnicos: false,
    modalEstadisticasArea: false,
};

export const uiAreaTicSlice = createSlice({
    name: "uiAreaTic",
    initialState,
    reducers: {
        onOpenModalActionAreaTic: (state) => {
            state.modalActionAreaTic = true;
        },
        onCloseModalActionAreaTic: (state) => {
            state.modalActionAreaTic = false;
        },
        onOpenModalDeleteAreaTic: (state) => {
            state.modalDeleteAreaTic = true;
        },
        onCloseModalDeleteAreaTic: (state) => {
            state.modalDeleteAreaTic = false;
        },
        onOpenModalAsignarTecnicos: (state) => {
            state.modalAsignarTecnicos = true;
        },
        onCloseModalAsignarTecnicos: (state) => {
            state.modalAsignarTecnicos = false;
        },
        onOpenModalEstadisticasArea: (state) => {
            state.modalEstadisticasArea = true;
        },
        onCloseModalEstadisticasArea: (state) => {
            state.modalEstadisticasArea = false;
        },
    },
});

export const {
    onOpenModalActionAreaTic,
    onCloseModalActionAreaTic,
    onOpenModalDeleteAreaTic,
    onCloseModalDeleteAreaTic,
    onOpenModalAsignarTecnicos,
    onCloseModalAsignarTecnicos,
    onOpenModalEstadisticasArea,
    onCloseModalEstadisticasArea,
} = uiAreaTicSlice.actions;
