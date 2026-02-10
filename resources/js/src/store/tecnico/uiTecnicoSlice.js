import { createSlice } from "@reduxjs/toolkit";

export const uiTecnicoSlice = createSlice({
    name: "uiTecnico",
    initialState: {
        isOpenModalAddTecnico: false,
        isOpenModalActivateTecnico: false,
        disabledInput: false,
    },
    reducers: {
        onToggleModalAddTecnico: (state, { payload }) => {
            state.isOpenModalAddTecnico = !state.isOpenModalAddTecnico;
            state.disabledInput = payload;
        },
        onToggleModalActivateTecnico: (state) => {
            state.isOpenModalActivateTecnico =
                !state.isOpenModalActivateTecnico;
        },
    },
});

export const { onToggleModalAddTecnico, onToggleModalActivateTecnico } =
    uiTecnicoSlice.actions;
