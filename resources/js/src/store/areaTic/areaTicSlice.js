import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    areas: [],
    activateArea: null,
    message: undefined,
    errores: undefined,
};

export const areaTicSlice = createSlice({
    name: "areaTic",
    initialState,
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadAreas: (state, { payload }) => {
            state.isLoading = false;
            state.areas = payload;
            state.errores = undefined;
        },
        onAddArea: (state, { payload }) => {
            state.areas.push(payload);
            state.activateArea = null;
        },
        onUpdateArea: (state, { payload }) => {
            state.areas = state.areas.map((area) => {
                if (area.id_areas_tic === payload.id_areas_tic) {
                    return payload;
                }
                return area;
            });
            state.activateArea = null;
        },
        onDeleteArea: (state, { payload }) => {
            state.areas = state.areas.filter(
                (area) => area.id_areas_tic !== payload,
            );
            state.activateArea = null;
        },
        onSetActivateArea: (state, { payload }) => {
            state.activateArea = payload;
            state.errores = undefined;
        },
        onLoadMessage: (state, { payload }) => {
            state.message = payload;
        },
        onLoadErrores: (state, { payload }) => {
            state.isLoading = false;
            state.errores = payload;
        },
        onClearAreas: (state) => {
            state.isLoading = false;
            state.areas = [];
            state.activateArea = null;
            state.message = undefined;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onLoadAreas,
    onAddArea,
    onUpdateArea,
    onDeleteArea,
    onSetActivateArea,
    onLoadMessage,
    onLoadErrores,
    onClearAreas,
} = areaTicSlice.actions;
