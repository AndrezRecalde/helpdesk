import { createSlice } from "@reduxjs/toolkit";

export const uiUserSlice = createSlice({
    name: "uiUser",
    initialState: {
        isOpenModalAddUser: false,
        isOpenModalResetPwd: false,
        isOpenModalActiveUser: false,
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
        onOpenModalActiveUser: (state) => {
            state.isOpenModalActiveUser = true;
        },
        onCloseModalActiveUser: (state) => {
            state.isOpenModalActiveUser = false;
        }
    },
});

export const {
    onOpenModalAddUser,
    onCloseModalAddUser,
    onOpenModalResetPwd,
    onCloseModalResetPwd,
    onOpenModalActiveUser,
    onCloseModalActiveUser
} = uiUserSlice.actions;
