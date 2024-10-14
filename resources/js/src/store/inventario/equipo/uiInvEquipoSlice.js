import { createSlice } from "@reduxjs/toolkit";

export const uiInvEquipoSlice = createSlice({
    name: "uiInvEquipo",
    initialState: {
        isOpenModalInvEquipo: false,
        isOpenModalAssignEquipo: false,
        isOpenModalViewEquipo: false,
        isOpenModalDeleteEquipo: false,
        isOpenModalBajaEquipo: false,
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
        onOpenModalDeleteEquipo: (state, { payload }) => {
            state.isOpenModalDeleteEquipo = payload;
        },
        onOpenModalBajaEquipo: (state, { payload }) => {
            state.isOpenModalBajaEquipo = payload;
        }
    },
});

export const {
    onOpenModalInvEquipo,
    onOpenModalAssignEquipo,
    onOpenModalViewEquipo,
    onOpenModalDeleteEquipo,
    onOpenModalBajaEquipo
} = uiInvEquipoSlice.actions;
