import { createSlice } from "@reduxjs/toolkit";

export const uiTecnicoSlice = createSlice({
    name: "uiTecnico",
    initialState: {
        isOpenModalAddTecnico: false,
    },
    reducers: {
        onOpenModalAddTecnico: (state, { payload }) => {
            state.isOpenModalAddTecnico = true;
        },
        onCloseModalAddTecnico: (state) => {
            state.isOpenModalAddTecnico = false;
        },
    },
});

export const { onOpenModalAddTecnico, onCloseModalAddTecnico } =
    uiTecnicoSlice.actions;
