import { createSlice } from "@reduxjs/toolkit";

export const uiUserSlice = createSlice({
    name: "uiUser",
    initialState: {
        isOpenModalAddUser: false,
        isOpenModalResetPwd: false,
    },
    reducers: {
        onOpenModalAddUser: (state) => {
            state.isOpenModalAddUser = true;
        },
        onCloseModalAddUser: (state) => {
            state.isOpenModalAddUser = false;
        },
        onOpenModalResetPwd: (state) => {
            state.isOpenModalResetPwd = true;
        },
        onCloseModalResetPwd: (state) => {
            state.isOpenModalResetPwd = false;
        },
    },
});

export const {
    onOpenModalAddUser,
    onCloseModalAddUser,
    onOpenModalResetPwd,
    onCloseModalResetPwd,
} = uiUserSlice.actions;
