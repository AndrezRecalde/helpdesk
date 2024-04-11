import { createSlice } from "@reduxjs/toolkit";


export const storageFieldsSlice = createSlice({
    name: "storageFields",
    initialState: {
        storageFields: null,
    },
    reducers: {
        onSetStorageFields: (state, { payload }) => {
            state.storageFields = payload;
        },
        onClearStorageFields: (state) => {
            state.storageFields = null;
        },
    },
});

export const { onSetStorageFields, onClearStorageFields } =
    storageFieldsSlice.actions;
