import { createSlice } from "@reduxjs/toolkit";
export const uiVacacionesSlice = createSlice({
    name: "uiVacaciones",
    initialState: {
        isOpenModalGestionarVacacion: false,
        isOpenModalSolAnulacion: false,
    },
    reducers: {
        onOpenModalGestionarVacacion: (state, { payload }) => {
            state.isOpenModalGestionarVacacion = payload;
        },
        onOpenModalSolAnulacion: (state, { payload }) => {
            state.isOpenModalSolAnulacion = payload;
        },
    },
});

export const {
    onOpenModalGestionarVacacion,
    onOpenModalSolAnulacion,
} = uiVacacionesSlice.actions;
