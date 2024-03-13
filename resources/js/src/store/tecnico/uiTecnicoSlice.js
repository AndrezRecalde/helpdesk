import { createSlice } from "@reduxjs/toolkit";

export const uiTecnicoSlice = createSlice({
    name: "uiTecnico",
    initialState: {
        isOpenModalAddTecnico: false,
        isOpenModalActivateTecnico: false,
        disabledInput: false,
    },
    reducers: {
        onOpenModalAddTecnico: (state, { payload }) => {
            state.isOpenModalAddTecnico = true;
            state.disabledInput = payload;
        },
        onCloseModalAddTecnico: (state) => {
            state.isOpenModalAddTecnico = false;
            state.disabledInput = false;
        },
        onOpenModalActivateTecnico: (state) => {
            state.isOpenModalActivateTecnico = true;
        },
        onCloseModalActivateTecnico: (state) => {
            state.isOpenModalActivateTecnico = false;
        },
    },
});

export const {
    onOpenModalAddTecnico,
    onCloseModalAddTecnico,
    onOpenModalActivateTecnico,
    onCloseModalActivateTecnico,
} = uiTecnicoSlice.actions;
