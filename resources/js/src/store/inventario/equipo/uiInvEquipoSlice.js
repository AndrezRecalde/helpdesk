import { createSlice } from "@reduxjs/toolkit";

export const uiInvEquipoSlice = createSlice({
    name: "uiInvEquipo",
    initialState: {
        isOpenModalInvEquipo: false,
        isOpenModalAssignEquipo: false,
    },
    reducers: {
        onOpenModalInvEquipo: (state, { payload }) => {
            state.isOpenModalInvEquipo = payload;
        },
        onOpenModalAssignEquipo: (state, { payload }) => {
            state.isOpenModalAssignEquipo = payload;
        },
    },
});

export const { onOpenModalInvEquipo, onOpenModalAssignEquipo } =
    uiInvEquipoSlice.actions;
