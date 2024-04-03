import { createSlice } from "@reduxjs/toolkit";

export const uiSoporteSlice = createSlice({
    name: "varName",
    initialState: {
        isOpenModalAsignarSoporte: false,
        isOpenModalAnularSoporte: false,
        isOpenModalAddSolicitud: false,
        isOpenModalCreateSoporte: false,
        isOpenModalDiagnosticar: false,
        isOpenModalCierreSoporte: false,
    },
    reducers: {
        onOpenModalAsignarSoporte: (state) => {
            state.isOpenModalAsignarSoporte = true;
        },
        onCloseModalAsignarSoporte: (state) => {
            state.isOpenModalAsignarSoporte = false;
        },
        onOpenModalAnularSoporte: (state) => {
            state.isOpenModalAnularSoporte = true;
        },
        onCloseModalAnularSoporte: (state) => {
            state.isOpenModalAnularSoporte = false;
        },
        onOpenModalAddSolicitud: (state) => {
            state.isOpenModalAddSolicitud = true;
        },
        onCloseModalAddSolicitud: (state) => {
            state.isOpenModalAddSolicitud = false;
        },
        onOpenModalCreateSoporte: (state) => {
            state.isOpenModalCreateSoporte = true;
        },
        onCloseModalCreateSoporte: (state) => {
            state.isOpenModalCreateSoporte = false;
        },
        onOpenModalDiagnosticar: (state) => {
            state.isOpenModalDiagnosticar = true;
        },
        onCloseModalDiagnosticar: (state) => {
            state.isOpenModalDiagnosticar = false;
        },
        onOpenModalCierreSoporte: (state) => {
            state.isOpenModalCierreSoporte = true;
        },
        onCloseModalCierreSoporte: (state) => {
            state.isOpenModalCierreSoporte = false;
        }
    },
});

export const {
    onOpenModalAsignarSoporte,
    onCloseModalAsignarSoporte,
    onOpenModalAnularSoporte,
    onCloseModalAnularSoporte,
    onOpenModalAddSolicitud,
    onCloseModalAddSolicitud,
    onOpenModalCreateSoporte,
    onCloseModalCreateSoporte,
    onOpenModalDiagnosticar,
    onCloseModalDiagnosticar,
    onOpenModalCierreSoporte,
    onCloseModalCierreSoporte
} = uiSoporteSlice.actions;
