import { createSlice } from "@reduxjs/toolkit";
export const uiRutaSlice = createSlice({
    name: "uiRuta",
    initialState: {
        isLoadingHelpRuta: true,
    },
    reducers: {
        onLoadingHelpRuta: (state, { payload }) => {
            state.isLoadingHelpRuta = payload;
        },
    },
});

export const {
    onLoadingHelpRuta
} = uiRutaSlice.actions;
