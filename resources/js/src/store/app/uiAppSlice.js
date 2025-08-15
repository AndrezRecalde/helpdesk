import { createSlice } from "@reduxjs/toolkit";

export const uiAppSlice = createSlice({
    name: "uiApp",
    initialState: {
        isOpenModalImagenes: false,
    },
    reducers: {
        onOpenModalImagenes: (state, { payload }) => {
            state.isOpenModalImagenes = payload;
        },
    },
});

export const { onOpenModalImagenes } = uiAppSlice.actions;
