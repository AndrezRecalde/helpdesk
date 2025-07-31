import { createSlice } from "@reduxjs/toolkit";
export const uiPeriodoSlice = createSlice({
    name: "uiPeriodoVacacional",
    initialState: {
        isOpenModalAddPeriodo: false,
        isOpenModalEditPeriodo: false,
    },
    reducers: {
        onOpenModalAddPeriodo: (state, { payload }) => {
            state.isOpenModalAddPeriodo = payload;
        },
        onOpenModalEditPeriodo: (state, { payload }) => {
            state.isOpenModalEditPeriodo = payload;
        },
    },
});

export const { onOpenModalAddPeriodo, onOpenModalEditPeriodo } =
    uiPeriodoSlice.actions;
