import { configureStore } from "@reduxjs/toolkit";
import {
    authSlice,
    cargoSlice,
    departamentoSlice,
    direccionSlice,
    directorSlice,
    empresaSlice,
    sexoSlice,
    soporteSlice,
    tipoContratoSlice,
    tipoSolicitudSlice,
    tiposUsuariosSlice,
    uiDirectorSlice,
    uiSoporteSlice,
    uiUserSlice,
    usersSlice,
} from "../store";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        uiUser: uiUserSlice.reducer,
        empresa: empresaSlice.reducer,
        direccion: direccionSlice.reducer,
        director: directorSlice.reducer,
        uiDirector: uiDirectorSlice.reducer,
        departamento: departamentoSlice.reducer,
        sexo: sexoSlice.reducer,
        cargo: cargoSlice.reducer,
        tipoUsuario: tiposUsuariosSlice.reducer,
        tipoContrato: tipoContratoSlice.reducer,
        tipoSolicitud: tipoSolicitudSlice.reducer,
        soporte: soporteSlice.reducer,
        uiSoporte: uiSoporteSlice.reducer
    },
});
