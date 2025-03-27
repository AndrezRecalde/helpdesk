import { createSlice } from "@reduxjs/toolkit";

export const uiHeaderMenuSlice = createSlice({
    name: "uiHeaderMenu",
    initialState: {
        isOpenModalAside: true,
        isOpenDrawerMobile: false,
        isOpenMenuLinksTics: false,
        isOpenMenuLinksGestionGeneral: false,
        isOpenMenuLinksPermisos: false
    },
    reducers: {
        onOpenModalAside: (state, { payload }) => {
            state.isOpenModalAside = payload;
        },
        onOpenDrawerMobile: (state, { payload }) => {
            state.isOpenDrawerMobile = payload;
        },
        onOpenMenuLinksTics: (state, { payload }) => {
            state.isOpenMenuLinksTics = payload;
        },
        onOpenMenuLinksGestionGeneral: (state, { payload }) => {
            state.isOpenMenuLinksGestionGeneral = payload;
        },
        onOpenMenuLinksPermisos: (state, { payload }) => {
            state.isOpenMenuLinksPermisos = payload;
        }
    },
});

export const {
    onOpenModalAside,
    onOpenDrawerMobile,
    onOpenMenuLinksTics,
    onOpenMenuLinksGestionGeneral,
    onOpenMenuLinksPermisos
} = uiHeaderMenuSlice.actions;
