import { configureStore } from "@reduxjs/toolkit";
import {
    actividadSlice,
    authSlice,
    cargoSlice,
    dashGerenciaSlice,
    departamentoSlice,
    diagnosticoSlice,
    direccionSlice,
    directorSlice,
    empresaSlice,
    equipoSlice,
    estadoSlice,
    indicadorSlice,
    invCategoriaSlice,
    invConceptoSlice,
    invConsumibleSlice,
    invEquipoSlice,
    invEstadoSlice,
    invMarcaSlice,
    invTipocategoriaSlice,
    invUbicacionSlice,
    marcacionSlice,
    permisoSlice,
    sexoSlice,
    soporteSlice,
    storageFieldsSlice,
    tecnicoSlice,
    tipoContratoSlice,
    tipoSolicitudSlice,
    tiposUsuariosSlice,
    uiActividadSlice,
    uiDirectorSlice,
    uiIndicadorSlice,
    uiInvCategoriaSlice,
    uiInvConceptoSlice,
    uiInvConsumibleSlice,
    uiInvCustodioSlice,
    uiInvEquipoSlice,
    uiInvEstadoSlice,
    uiInvMarcaSlice,
    uiInvTipocategoriaSlice,
    uiInvUbicacionSlice,
    uiPermisoSlice,
    uiSoporteSlice,
    uiTecnicoSlice,
    uiUserSlice,
    usersSlice,
} from "../store";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        uiUser: uiUserSlice.reducer,
        tecnico: tecnicoSlice.reducer,
        uiTecnico: uiTecnicoSlice.reducer,
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
        diagnostico: diagnosticoSlice.reducer,
        equipo: equipoSlice.reducer,
        soporte: soporteSlice.reducer,
        uiSoporte: uiSoporteSlice.reducer,
        estado: estadoSlice.reducer,
        indicador: indicadorSlice.reducer,
        uiIndicador: uiIndicadorSlice.reducer,
        actividad: actividadSlice.reducer,
        permiso: permisoSlice.reducer,
        uiPermiso: uiPermisoSlice.reducer,
        marcacion: marcacionSlice.reducer,
        uiActividad: uiActividadSlice.reducer,
        dashGerencia: dashGerenciaSlice.reducer,

        /* Inventario */
        invTipocategoria: invTipocategoriaSlice.reducer,
        uiInvTipocategoria: uiInvTipocategoriaSlice.reducer,

        invCategoria: invCategoriaSlice.reducer,
        uiInvCategoria: uiInvCategoriaSlice.reducer,

        invMarca: invMarcaSlice.reducer,
        uiInvMarca: uiInvMarcaSlice.reducer,

        invEstado: invEstadoSlice.reducer,
        uiInvEstado: uiInvEstadoSlice.reducer,

        invConcepto: invConceptoSlice.reducer,
        uiInvConcepto: uiInvConceptoSlice.reducer,

        invUbicacion: invUbicacionSlice.reducer,
        uiInvUbicacion: uiInvUbicacionSlice.reducer,

        invEquipo: invEquipoSlice.reducer,
        uiInvEquipo: uiInvEquipoSlice.reducer,

        invConsumible: invConsumibleSlice.reducer,
        uiInvConsumible: uiInvConsumibleSlice.reducer,

        uiInvCustodio: uiInvCustodioSlice.reducer,

        storageField: storageFieldsSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
