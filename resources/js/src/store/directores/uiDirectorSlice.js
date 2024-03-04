import { createSlice } from "@reduxjs/toolkit";

export const uiDirectorSlice = createSlice({
    name: "uiDirector",
    initialState: {
        isOpenModalActionDirector: false,
    },
    reducers: {
        onOpenModalActionDirector: (state) => {
            state.isOpenModalActionDirector = true;
        },
        onCloseModalActionDirector: (state) => {
            state.isOpenModalActionDirector = false;
        },
    },
});

export const { onOpenModalActionDirector, onCloseModalActionDirector } =
    uiDirectorSlice.actions;
