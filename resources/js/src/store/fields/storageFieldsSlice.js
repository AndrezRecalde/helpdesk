import { createSlice } from "@reduxjs/toolkit";

export const storageFieldsSlice = createSlice({
    name: "storageFields",
    initialState: {
        storageFields: null,
        storageUserFields: null,
        storagePermisoFields: null
    },
    reducers: {
        onSetStorageFields: (state, { payload }) => {
            state.storageFields = payload;
        },
        onSetStorageUserFields: (state, { payload }) => {
            state.storageUserFields = payload;
        },
        onSetStoragePermisoFields: (state, { payload }) => {
            state.storagePermisoFields = payload;
        },
        onClearStorageFields: (state) => {
            state.storageFields = null;
            state.storageUserFields = null;
            state.storagePermisoFields = null;
        },
    },
});

export const {
    onSetStorageFields,
    onSetStorageUserFields,
    onSetStoragePermisoFields,
    onClearStorageFields,
} = storageFieldsSlice.actions;
