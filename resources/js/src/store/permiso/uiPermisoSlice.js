import { createSlice } from "@reduxjs/toolkit";

export const uiPermisoSlice = createSlice({
    name: "uiPermiso",
    initialState: {
        isOpenModalAnularPermiso: false,
    },
    reducers: {
        onOpenModalAnularPermiso: (state) => {
            state.isOpenModalAnularPermiso = true;
        },
        onCloseModalAnularPermiso: (state) => {
            state.isOpenModalAnularPermiso = false;
        },
    },
});

export const { onOpenModalAnularPermiso, onCloseModalAnularPermiso } =
    uiPermisoSlice.actions;
