import { createSlice } from "@reduxjs/toolkit";
export const uiIndicadorSlice = createSlice({
    name: "uiIndicador",
    initialState: {
        isOpenModalDesempTecnicos: false,
    },
    reducers: {
        onOpenModalDesempTecnicos: (state) => {
            state.isOpenModalDesempTecnicos = true;
        },
        onCloseModalDesempTecnicos: (state) => {
            state.isOpenModalDesempTecnicos = false;
        },
    },
});

export const { onOpenModalDesempTecnicos, onCloseModalDesempTecnicos } =
    uiIndicadorSlice.actions;
