import { createSlice } from "@reduxjs/toolkit";

export const uiUserSlice = createSlice({
    name: "uiUser",
    initialState: {
        isOpenModalAddUser: false,
        isOpenModalResetPwd: false,
        isOpenModalActiveUser: false,
        isModalEditUser: false,
    },
    reducers: {
        onOpenModalAddUser: (state, { payload }) => {
            state.isOpenModalAddUser = payload;
        },
        onOpenModalResetPwd: (state, { payload }) => {
            state.isOpenModalResetPwd = payload;
        },
        onOpenModalActiveUser: (state, { payload }) => {
            state.isOpenModalActiveUser = payload;
        },
        onOpenModalEditUser: (state, { payload }) => {
            state.isModalEditUser = payload;
        }
    },
});

export const {
    onOpenModalAddUser,
    onOpenModalResetPwd,
    onOpenModalActiveUser,
    onOpenModalEditUser
} = uiUserSlice.actions;
