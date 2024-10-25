import { createSlice } from "@reduxjs/toolkit";

export const uiInvPerifericoSlice = createSlice({
    name: "uiInvPeriferico",
    initialState: {
        isOpenModalPeriferico: false,
        isOpenModalTransferirPeriferico: false
    },
    reducers: {
        onOpenModalInvPeriferico: (state, { payload }) => {
            state.isOpenModalPeriferico = payload;
        },
        onOpenModalTransferirPeriferico: (state, { payload }) => {
            state.isOpenModalTransferirPeriferico = payload;
        }
    },
});

export const { onOpenModalInvPeriferico, onOpenModalTransferirPeriferico } = uiInvPerifericoSlice.actions;
