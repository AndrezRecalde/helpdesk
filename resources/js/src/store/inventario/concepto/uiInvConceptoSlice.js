import { createSlice } from "@reduxjs/toolkit";

export const uiInvConceptoSlice = createSlice({
    name: "uiInvConcepto",
    initialState: {
        isOpenModalInvConcepto: false,
    },
    reducers: {
        onOpenModalInvConcepto: (state, { payload }) => {
            state.isOpenModalInvConcepto = payload;
        },
    },
});

export const { onOpenModalInvConcepto } = uiInvConceptoSlice.actions;
