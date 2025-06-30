import { createSlice } from "@reduxjs/toolkit";
export const uiPeriodoSlice = createSlice({
    name: "uiPeriodoVacacional",
    initialState: {
        isOpenModalAddPeriodo: false,
    },
    reducers: {
        onOpenModalAddPeriodo: (state, { payload }) => {
            state.isOpenModalAddPeriodo = payload;
        },
    },
});

export const { onOpenModalAddPeriodo } = uiPeriodoSlice.actions;
