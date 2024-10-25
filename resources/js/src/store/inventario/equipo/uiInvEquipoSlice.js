import { createSlice } from "@reduxjs/toolkit";

export const uiInvEquipoSlice = createSlice({
    name: "uiInvEquipo",
    initialState: {
        isOpenModalInvEquipo: false,
        isOpenModalAssignEquipo: false,
        isOpenModalViewEquipo: false,
        isOpenModalDeleteEquipo: false,
        isOpenModalBajaEquipo: false,
        isOpenModalAssignPeriferico: false,
        isOpenModalAddDocumento: false
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
        },
        onOpenModalAssignPeriferico: (state, { payload }) => {
            state.isOpenModalAssignPeriferico = payload;
        },
        onOpenModalAddDocumento: (state, { payload }) => {
            state.isOpenModalAddDocumento = payload;
        }
    },
});

export const {
    onOpenModalInvEquipo,
    onOpenModalAssignEquipo,
    onOpenModalViewEquipo,
    onOpenModalDeleteEquipo,
    onOpenModalBajaEquipo,
    onOpenModalAssignPeriferico,
    onOpenModalAddDocumento
} = uiInvEquipoSlice.actions;
