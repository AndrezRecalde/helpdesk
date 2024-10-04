import { createSlice } from "@reduxjs/toolkit";

export const uiInvEquipoSlice = createSlice({
    name: "uiInvEquipo",
    initialState: {
        isOpenModalInvEquipo: false,
        isOpenModalAssignEquipo: false,
        isOpenModalViewEquipo: false,
    },
    reducers: {
        onOpenModalInvEquipo: (state, { payload }) => {
            state.isOpenModalInvEquipo = payload;
        },
        onOpenModalAssignEquipo: (state, { payload }) => {
            state.isOpenModalAssignEquipo = payload;
        },
        onOpenModalViewEquipo: (state, { payload }) => {
            state.isOpenModalViewEquipo = payload;
        },
    },
});

export const {
    onOpenModalInvEquipo,
    onOpenModalAssignEquipo,
    onOpenModalViewEquipo,
} = uiInvEquipoSlice.actions;
